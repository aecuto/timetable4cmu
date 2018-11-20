class EnrollmentService
  require 'open-uri'
  require 'nokogiri'
  require "net/http"
  require "uri"
  
  def courses(semester, year, sid)

    url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s
    
    begin
      open_url = open(url)
    rescue OpenURI::HTTPError
      return "error"
    end

    respon = Nokogiri::HTML(open_url)
    courses = respon.css('.msan8')
    @courses = []

    courses.each do |course|
      d = course.css('td')
      if is_number?(d[0].text)
        
        type = d[9].text.delete(' ')
        type = "A" if type.length > 1

        course = get_course(semester, year, course)
        next if course[7].text=="TBA"
        days = course[7].text.delete('-').split(/(?=[A-Z])/)

        days.each do |day|
          @courses << {
            no: d[1].text,
            name: course[2].text,
            lec: course[3].text,
            lab: course[4].text,
            day: day,
            time: check_red_time(day, course),
            room: check_red_room(day, course),
            type: type
          }
        end
        
      end
    end

    return @courses

  end

  def midterm_exam(semester, year, sid)

    url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s

    respon = Nokogiri::HTML(open(url))
    exams = respon.css('.msan8')
    @exams = []

    exams.each do |exam|
      d = exam.css('td')
      if is_number?(d[0].text)

        exam = get_course(semester, year, exam)
        next if exam[11].css('gray').text.split(' ')[0].to_i == 0
        @exams << {
          no: d[1].text,
          course_name: exam[2].text,
          day: exam[11].css('gray').text.to_date.strftime('%m/%d').to_date,
          time: time_object(exam[12].css('gray').text)
        }

      end
    end

    return @exams.sort_by!{ |e| e[:day] }

  end

  def final_exam(semester, year, sid)

    url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s

    respon = Nokogiri::HTML(open(url))
    exams = respon.css('.msan8')
    @exams = []

    exams.each do |exam|
      d = exam.css('td')
      if is_number?(d[0].text)

        exam = get_course(semester, year, exam)
        if exam[11].css('p').text.split(' ')[0].to_i != 0
          @exams << {
            no: d[1].text,
            course_name: exam[2].text,
            day: exam[11].css('p').text.to_date.strftime('%m/%d').to_date,
            time: time_object(exam[12].css('p').text)
          }
        else
          reg_exam = regular_exam(d[1], exam[2], semester, year, exam[7], exam[8])
          @exams << reg_exam unless reg_exam.blank?
        end

      end
    end

    return @exams.sort_by!{ |e| e[:day] }

  end

  private
    def is_number?(string)
      true if Float(string) rescue false
    end

    def get_course(semester, year, course)
      uri = URI.parse("https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/search.php?act=search")

      d = course.css('td')
      form={"s_course1" => d[1].text, "s_lec1" => d[3].text, "s_lab1" => d[4].text, "op" => "bycourse"}
      respon = Net::HTTP.post_form(uri, form)
      coreses = Nokogiri::HTML(respon.body)

      return coreses.css('td')
    end

    def regular_exam(course_no, course_name, semester, year, day, time)
      url_final = "https://www3.reg.cmu.ac.th/regist/public/exam.php?type=FINAL&term="+semester.to_s+year.to_s
      respon = Nokogiri::HTML(open(url_final))
      regulars = respon.css('tr')

      regulars.each do |regular|
        reg = regular.css('td div')
        next if reg[5].nil?

        reg_day = reg[0].text.delete(' ')
        course_day = day.text.delete(' ')

        reg_time = reg[1].text.to_i
        course_time = time.text.split(' ')[0].to_i

        if reg_time==course_time && reg_day==course_day
          return {
            no: course_no.text,
            course_name: course_name.text,
            day: "#{reg[4].text} #{reg[3].text}".to_date.strftime('%m/%d').to_date,
            time: time_object(reg[5].text)
          }
        end
      end

      return []

    end

    def time_object(time)
      time = time.delete(':').delete(' ').split('-')
      return {
        start: time[0],
        end: time[1]
      }
    end

    def check_red_time(day, course)
      if course[7].css('red').present?
        if course[7].css('red').text == day
          return time_object(course[8].css('red').text)
        else
          return time_object(course[8].css('> text()').text)
        end
      end
      return time_object(course[8].text)
    end

    def check_red_room(day, course)
      if course[7].css('red').present?
        if course[7].css('red').text == day
          return course[9].css('red').text.delete('-')
        else
          return course[9].css('> text()').text.delete('-')
        end
      end
      return course[9].text
    end
end
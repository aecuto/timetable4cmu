class EnrollmentsService
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
        next if course[7].nil?
        next if course[7].text=="TBA"
        days = course[7].text.delete('-').split(/(?=[A-Z])/)
        days.each_with_index do |day, index|
          @courses << {
            no: d[1].text,
            name: course[2].text,
            lec: course[3].text,
            lab: course[4].text,
            day: day,
            time: check_red_time(day, course, index),
            room: check_red_room(day, course, index),
            type: type,
            mid_exam: midterm_exam(course),
            final_exam: final_exam(semester, year, course)
          }
        end
        
      end
    end

    return @courses.sort_by{|c| c[:time][:start]}

  end

  def midterm_exam(course)
    if course[11].css('gray').present?
      return {
        day: course[11].css('gray').text.to_date.strftime('%m/%d').to_date,
        time: time_object(course[12].css('gray').text)
      }
    end
    return {}
  end

  def final_exam(semester, year, course)
    if course[11].css('p').text == "REGULAR"
      return regular_exam(semester, year, course[7], course[8])
    elsif course[11].css('p').present?
      return {
        day: course[11].css('p').text.to_date.strftime('%m/%d').to_date,
        time: time_object(course[12].css('p').text)
      }
    end

    return {}
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

    def regular_exam(semester, year, day, time)
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
            day: "#{reg[4].text} #{reg[3].text}".to_date.strftime('%m/%d').to_date,
            time: time_object(reg[5].text)
          }
        end
      end

      return {}

    end

    def time_object(time)
      time = time.delete(':').delete(' ').split('-')
      return {
        start: time[0],
        end: time[1]
      }
    end

    def check_red_time(day, course, index)
      if course[7].css('red').present?
        if index == 0
          return time_object(course[8].css('red').text)
        else
          return time_object(course[8].css('> text()').text)
        end
      end
      return time_object(course[8].text)
    end

    def check_red_room(day, course, index)
      if course[7].css('red').present?
        if index == 0
          return course[9].css('red').text.delete('-')
        else
          return course[9].css('> text()').text.delete('-')
        end
      end
      return course[9].text
    end
end
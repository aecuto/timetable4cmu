class EnrollmentService
  def list(semester, year, sid)

    url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s

    respon = Nokogiri::HTML(open(url))
    courses = respon.css('.msan8')
    @courses = []

    courses.each do |course|
      d = course.css('td')
      if is_number?(d[0].text)
        
        type = d[9].text.delete(' ')
        type = "A" if type.length > 1

        course = get_course(semester, year, course)
        next if course[7].text=="TBA"
        @courses << {
          no: d[1].text,
          name: course[2].text,
          lec: course[3].text,
          lab: course[4].text,
          day: check_red_text(course[7]),
          time: check_red_text(course[8]),
          room: check_red_text(course[9]),
          type: type
        }
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
          day: exam[11].css('gray').text.to_date,
          time: exam[12].css('gray').text
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
            day: exam[11].css('p').text.to_date,
            time: exam[12].css('p').text
          }
        else
          reg_exam = regular_exam(semester, year, exam[7], exam[8])
          @exams << reg_exam unless reg_exam.blank?
        end

      end
    end

    puts @exams
    #return @exams.sort_by!{ |e| e[:day] }

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
            day: "#{reg[4].text} #{reg[3].text}".to_date,
            time: reg[5].text
          }
        end
      end

      return []

    end

    def check_red_text(array)
      if array.css('red').present?
        return [
          array.css('> text()').text,
          array.css('red').text
        ]
      end
      return array.text
    end
  
end
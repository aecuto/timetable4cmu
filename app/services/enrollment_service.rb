class EnrollmentService
  def list
    semester = "1"
    year = "61"
    sid = "610510628"

    uri = URI.parse("https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/search.php?act=search")
    url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s

    infor = Nokogiri::HTML(open(url))
    data = infor.css('.msan8')
    @timetables = Array.new

    binding.pry
  end
end
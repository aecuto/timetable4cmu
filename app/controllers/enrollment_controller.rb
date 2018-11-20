class EnrollmentController < ApplicationController

  def index
  end

  def show

    redirect_to root_url, :notice => "Fail Login, make sure your infomation!"  if validate(params[:sid], params[:term])

    term = params[:term].split('/')
    semester = term[0]
    year = term[1]
    @sid = params[:sid]

    entrollment = EnrollmentService.new

    @times = Array["0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300","2400"]
    @days = Array["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    
    #timetable
    @courses = entrollment.courses(semester, year, @sid)
    @classes = entrollment.course_class(@courses)
    @range = entrollment.range_time(@courses)
    @course_days = entrollment.course_day(@courses)

    #mid
    @courses_mid = entrollment.midterm_exam(semester, year, @sid)
    @classes_mid = entrollment.course_class(@courses_mid)
    @range_mid = entrollment.range_time(@courses_mid)
    @course_days_mid = entrollment.course_day(@courses_mid)

    #final
    @courses_final = entrollment.final_exam(semester, year, @sid)
    @classes_final = entrollment.course_class(@courses_final)
    @range_final = entrollment.range_time(@courses_final)
    @course_days_final = entrollment.course_day(@courses_final)

  end


  private
    def validate(sid, term)
      return true if params[:sid].include?("_") || params[:term].include?("_")
      return true if params[:sid].blank? || params[:term].blank?
    end
  
end

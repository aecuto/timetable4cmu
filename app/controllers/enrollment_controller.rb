class EnrollmentController < ApplicationController

  def index
  end

  def show

    redirect_to root_url, :notice => "Successfully checked in"  if validate(params[:sid], params[:term])

    term = params[:term].split('/')
    semester = term[0]
    year = term[1]
    sid = params[:sid]

    entrollment = EnrollmentService.new
    @courses = entrollment.courses(semester, year, sid)
    @mindterm_exam = entrollment.midterm_exam(semester, year, sid)
    @final_exam = entrollment.final_exam(semester, year, sid)

    @classes = entrollment.course_class(@courses)

    @times = Array["0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300","2400"]
    @range = entrollment.range_time(@courses)

    @days = Array["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    @course_days = entrollment.course_day(@courses)

  end


  private
    def validate(sid, term)
      return true if params[:sid].include?("_") || params[:term].include?("_")
      return true if params[:sid].blank? || params[:term].blank?
    end
  
end

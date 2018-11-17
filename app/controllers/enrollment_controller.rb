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

  end


  private
    def validate(sid, term)
      return true if params[:sid].include?("_") || params[:term].include?("_")
      return true if params[:sid].blank? || params[:term].blank?
    end
  
end

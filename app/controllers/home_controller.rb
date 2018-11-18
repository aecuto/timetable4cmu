require 'open-uri'
require 'nokogiri'
require "net/http"
require "uri"

class HomeController < ApplicationController

  def login
    if params[:commit] == "Submit" &&  params[:sid].to_s.length == 9 && params[:semester].to_s.length == 1  && params[:year].to_s.length == 2

      session[:semester]=params[:semester]
      session[:year]=params[:year]
      session[:sid]=params[:sid]

      # puts session[:semester]
      # puts session[:year]
      # puts session[:sid]
      redirect_to "/"
    end
  end

  def logout
    reset_session
    redirect_to "/login"
  end

  def index
    if session[:semester] == nil
      redirect_to "/login"
    end

    if session[:semester] != nil
      semester=session[:semester]
      year=session[:year]
      sid=session[:sid]

      # value for html
      @times = Array["0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300","2400"]
      @weeks = Array["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
      @day1 = Array["M","Tu","W", "Th","F","Sa","Su"]
      @day2 = Array["Mo","T","We", "Th","Fr","Sa","Su"]
      @color = Array["#FF6138","#DA9844","#2B4C8C","#644D52","#00A388","#F25F5C","#247BA0","#A6937C","#332532","#0D1326"]
      @color_tab = "#212121"
      @color_blank = "#424242"

      entrollment = EnrollmentService.new
      @courses = entrollment.courses(semester, year, sid)
      @mindterm_exam = entrollment.midterm_exam(semester, year, sid)
      @final_exam = entrollment.final_exam(semester, year, sid)
    end
  end


end

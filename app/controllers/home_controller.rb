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
	end

	def timetable
		if session[:semester] == nil
			redirect_to "/login"
		end


		

		# # Shortcut
		# form={"s_course1" => "204333", "s_lec1" => "001", "s_lab1" => "000", "op" => "bycourse"}
		# response = Net::HTTP.post_form(uri, form)

		# infor = Nokogiri::HTML(response.body)
		# @room = infor.css('td').text

		semester=session[:semester]
		year=session[:year]
		sid=session[:sid]

		#index for find room
		if year.to_i<58
			index=7
		else
			index=9
		end


		uri = URI.parse("https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/search.php?act=search")
		url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s

		infor = Nokogiri::HTML(open(url))
		data = infor.css('.msan8')
		@timetables = Array.new

		data.each do |d|
			if !(d.css('td')[2].text == "TITLE" || d.css('td')[2].text == "LEC")

				str = nil
				str2 = nil

				if d.css('td')[8].css('font').text != ''
		    		#puts "Time: " + d.css('td > text()')[8].text + " and " + d.css('td')[8].css('font').text
		    		str = d.css('td > text()')[8].text[0,4] + "\0" + d.css('td > text()')[8].text[7,11] + "\0"
		    		str2 = d.css('td')[8].css('font').text[0,4] + "\0" + d.css('td')[8].css('font').text[7,11] + "\0"
		    	else
		    		#puts "Time: " + d.css('td > text()')[8].text
		    		str = d.css('td > text()')[8].text[0,4] + "\0" + d.css('td > text()')[8].text[7,11] + "\0"
		    	end

		    	if d.css('td')[7].css('font').text != ''
		    		#puts "Day: " + d.css('td > text()')[7].text + " and " + d.css('td')[7].css('font').text
		    		str += d.css('td > text()')[7].text + "\0"
		    		str2 += d.css('td')[7].css('font').text + "\0"
		    	else
		    		#puts "Day: " + d.css('td > text()')[7].text
		    		str += d.css('td > text()')[7].text + "\0"
		    	end


		    	#puts "SUBJNAME: " + d.css('td')[2].text
		    	str += d.css('td')[2].text + "\0"
		    	# puts "SUBJID: " + d.css('td')[1].text
		    	str += d.css('td')[1].text + "\0"
		    	# puts "LEC: " + d.css('td')[3].text
		    	str += d.css('td')[3].text + "\0"
		    	# puts "LAB: " + d.css('td')[4].text
		    	str += d.css('td')[4].text + "\0"
		    	# puts "_______________"

		    	# add other data to str2
		    	if str2 != nil
		    		str2 += d.css('td')[2].text + "\0" + d.css('td')[1].text + "\0" + d.css('td')[3].text + "\0" + d.css('td')[4].text + "\0"
		    	end
		    	

		    	#find room
		    	form={"s_course1" => d.css('td')[1].text, "s_lec1" => d.css('td')[3].text, "s_lab1" => d.css('td')[4].text, "op" => "bycourse"}
		    	response = Net::HTTP.post_form(uri, form)

		    	rooms = Nokogiri::HTML(response.body)
		    	room = rooms.css('td')


		    	if room[index]
		    		if room[index].css('red').text != ''
						#puts room[7].css('> text()').text
						str += room[index].css('> text()').text
						#puts room[7].css('red').text
						str2 += room[index].css('red').text
					else
						str += room[index].text
					end
				else
				 #puts "nothing"
				 str += "Unknow"
				end
				




				@timetables << str

				if str2 != nil
					@timetables << str2
				end

			end
		end

		 # order times
		 i=0
		 j=0
		 while i < @timetables.length
		 	while j < @timetables.length
		 		if @timetables[i][0,4] < @timetables[j][0,4]
		 			@timetables[i], @timetables[j] = @timetables[j], @timetables[i]
		 		end
		 		j+=1
		 	end
		 	i+=1
		 	j=0
		 end

		 # find MAX AND MIN TIME TO STUDY
		 @begin_time = "2400"
		 @end_time = "0600"

		 @timetables.each do |t|
		 	times = t.split("\0")
		 	if times[0] < @begin_time
		 		@begin_time=times[0]
		 	end

		 	if times[1] > @end_time
		 		@end_time=times[1]
		 	end

		 end

		 # set course for color
		 @courses = Array.new
		 @timetables.each do |t|
		 	i=0
		 	add = true
		 	course = t.split("\0")

		 	if @courses.length == 0
		 		@courses << course[4]
		 	else
		 		while i<@courses.length do
		 			if @courses[i] == course[4]
		 				add = false
		 				break
		 			end
		 			i+=1
		 		end
		 		if add
		 			@courses << course[4]
		 		end
		 	end
		 end

		 # @courses.each do |c|
		 # 	puts c
		 # 	puts @courses.index(c)
		 # end


		 # value for html
		 @time = Array["0600","0700","0800","0900","1000","1100","1200","1300","1400","1500","1600","1700","1800","1900","2000","2100","2200","2300","2400"]
		 @day = Array["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
		 @day1 = Array["MTh","TuF","We", "MTh","TuF","SaSu",""]
		 @day2 = Array["Mo","Tu","We", "Th","Fr","Sa","Su"]
		 @color = Array["#FF6138","#DA9844","#2B4C8C","#644D52","#00A388","#F25F5C","#247BA0","#A6937C","#332532","#0D1326"]
		 @color_tab = "#212121"
		 @color_blank = "#424242"

		end

		def examschedule
			if session[:semester] == nil
				redirect_to "/login"
			end
		end

		def help
			if session[:semester] == nil
				redirect_to "/login"
			end
		end

		def contact
			if session[:semester] == nil
				redirect_to "/login"
			end
		end
	end

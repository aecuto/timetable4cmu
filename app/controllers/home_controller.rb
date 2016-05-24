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

	#571210118
	def timetable
		if session[:semester] == nil
			redirect_to "/login"
		end

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
		    		str += d.css('td > text()')[7].text.remove('-') + "\0"
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
				 str += "-"
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
		 @day1 = Array["M","T","W", "Th","F","Sa","Su"]
		 @day2 = Array["Mo","Tu","We", "Th","Fr","Sa","Su"]
		 @color = Array["#FF6138","#DA9844","#2B4C8C","#644D52","#00A388","#F25F5C","#247BA0","#A6937C","#332532","#0D1326"]
		 @color_tab = "#212121"
		 @color_blank = "#424242"
		end

	def exam
			if session[:semester] == nil
				redirect_to "/login"
			end

			semester=session[:semester]
			year=session[:year]
			sid=session[:sid]

			@color_tab = "#212121"
			@color_blank = "#424242"


			url = "https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/result.php?id=" + sid.to_s
			uri = URI.parse("https://www3.reg.cmu.ac.th/regist" + semester.to_s+year.to_s + "/public/search.php?act=search")
			url_final = "https://www3.reg.cmu.ac.th/regist/public/exam.php?type=FINAL&term="+semester.to_s+year.to_s

			infor = Nokogiri::HTML(open(url))
			data = infor.css('.msan8')

		#regular data
		regular = Nokogiri::HTML(open(url_final))
		regulars = regular.css('tr')

		# regulars.each do |r|
		# 	puts "|"+r.css('td div')[0].text+"|"
		# end
		@mid = Array.new
		@final = Array.new


		data.each do |d|
			if !(d.css('td')[2].text == "TITLE" || d.css('td')[2].text == "LEC") && year.to_i>=58

		    	#find exam date/time
		    	form={"s_course1" => d.css('td')[1].text, "s_lec1" => d.css('td')[3].text, "s_lab1" => d.css('td')[4].text, "op" => "bycourse"}
		    	response = Net::HTTP.post_form(uri, form)

		    	exam_dt = Nokogiri::HTML(response.body)
		    	exam_dts = exam_dt.css('td')

		    	# exam_dts.each do |e|
		    	# 	puts e.text
		    	# end
		    	str_mid = nil
		    	str_final = nil
		    	subj_name = nil

		    	if exam_dts[2]
			    	#puts exam_dts[2].text #subj name
			    	subj_name=exam_dts[2].text
			    end

			    if exam_dts[11].text == ''
		    		# puts "MID"
		    		# puts "-"
		    		# puts "-"
		    		str_mid = "32 NNN 0000" + "\0" + "00:00-00:00" + "\0" + subj_name
		    		#puts "Final"
		    		# puts "-"
		    		# puts "-"
		    		str_final = "32 NNN 0000" + "\0" + "00:00-00:00" + "\0" + subj_name
		    	else
		    		#puts "MID"
		    		if exam_dts[11].css('gray').text != ''
		    			# puts exam_dts[11].css('gray').text
		    			# puts exam_dts[12].css('gray').text
		    			str_mid = exam_dts[11].css('gray').text + "\0" + exam_dts[12].css('gray').text + "\0" + subj_name
		    		else
		    			# puts "-"
		    			# puts "-"
		    			str_mid = "32 NNN 0000" + "\0" + "00:00-00:00" + "\0" + subj_name
		    		end

		    		#puts "Final"
		    		if exam_dts[11].css('p').text != ''
		    			if exam_dts[11].css('p').text ==  "REGULAR"
		    				regulars.each do |r|
		    					# puts "**"+exam_dts[7].text + "|"+ r.css('td div')[0].text+ "|"
		    					# puts "**"+exam_dts[8].text[0,4] + "|"+ r.css('td div')[1].text+ "|"
		    					if exam_dts[7].text==r.css('td div')[0].text.delete(' ') && exam_dts[8].text[0,4]==r.css('td div')[1].text   # [7]=day [8]=time
									#puts r.css('td div')[0].text #study date
									#puts r.css('td div')[1].text #study time
									#puts "------"
									#puts r.css('td div')[4].text + " " + r.css('td div')[3].text # date
			    					#puts r.css('td div')[5].text #time
			    					str_final = r.css('td div')[4].text + " " + r.css('td div')[3].text + " 0000" + "\0" + r.css('td div')[5].text + "\0" + subj_name
			    					break
			    				end
			    			end
			    			if str_final == nil
			    				str_final = "32 NNN 0000" + "\0" + "00:00-00:00" + "\0" + subj_name
			    			end
			    		else
		    				# puts exam_dts[11].css('p').text
		    				# puts exam_dts[12].css('p').text
		    				str_final =  exam_dts[11].css('p').text + "\0" + exam_dts[12].css('p').text + "\0" + subj_name
		    			end
		    		else
		    			# puts "-"
		    			# puts "-"
		    			str_final = "32 NNN 0000" + "\0" + "00:00-00:00" + "\0" + subj_name
		    		end


		    	end

		    	#puts "---------"
		    	@mid << str_mid
		    	@final << str_final

		    end
		end

		#str = "28 FEB 2016" + "\0" + "08:00-11:00" + "\0" + "A"
		# str2 = "29 FEB 2016" + "\0" + "08:00-11:00" + "\0" + "A"
		# str = "29 FEB 2016" + "\0" + "12:00-15:00" + "\0" + "B"

		# @mid << str << str2 

		month = Array["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","NNN"]

		# @mid.each do |m|
		# 	data = m.split("\0")
		# 	data.each do |d|
		# 		puts d
		# 	end
		# 	puts "----"
		# end

		@exam_arr = Array[@mid,@final]

		# order
		#e = @mid
		@exam_arr.each do |e|
			#order month
			i=0
			j=0
			while i < e.length
				while j < e.length
					#puts month.index(e[i][3,4].delete(' ')).to_i
					#puts month.index(e[j][3,4].delete(' ')).to_i
					if month.index(e[i][3,4].delete(' ')).to_i < month.index(e[j][3,4].delete(' ')).to_i
						
			 			e[i], e[j] = e[j], e[i]
			 		end
			 		j+=1
			 	end
			 	i+=1
			 	j=0
			end

			#order day
			i=0
			j=0
			while i < e.length
				while j < e.length
					if (e[i][3,4].delete(' ') == e[j][3,4].delete(' ')) && e[i][0,2] < e[j][0,2]
						#puts month.index(e[i][3,4].delete(' ')).to_i
						#puts month.index(e[j][3,4].delete(' ')).to_i
			 			e[i], e[j] = e[j], e[i]
			 		end
			 		j+=1
			 	end
			 	i+=1
			 	j=0
			end

			#order time
			i=0
			j=0
			while i < e.length
				while j < e.length
					if (e[i][11,3] < e[j][11,3]) && (e[i][3,4].delete(' ') == e[j][3,4].delete(' ')) && (e[i][0,2] == e[j][0,2])
						#puts month.index(e[i][3,4].delete(' ')).to_i
						#puts month.index(e[j][3,4].delete(' ')).to_i
			 			e[i], e[j] = e[j], e[i]
			 		end
			 		j+=1
			 	end
			 	i+=1
			 	j=0
			end
		end #end order month/day/time for exam mid/final

	end

end



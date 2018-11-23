module Api
  module V1
    class Enrollments < Grape::API

      version 'v1', using: :path
      format :json
      prefix :api
      resource :enrollments do
        desc 'Return list of enrolled courses.'
        params do
          requires :semester, type: Integer, desc: 'Semester of enrollment.'
          requires :year, type: Integer, desc: 'Year of enrollment.'
          requires :sid, type: Integer, desc: 'Student ID.'
        end
        post do
          entrollment = EnrollmentService.new
          @courses = entrollment.courses(params[:semester], params[:year], params[:sid])
          
          return "Term not Found" if @courses == "error"

          present :courses, @courses, with: Api::Entities::Enrollment
        end
      end

    end
  end
end
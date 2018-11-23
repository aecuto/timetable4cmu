module Api
  module Entities

    class ExamDay < Grape::Entity
      format_with :exam_day do |date|
        date.strftime('%d %B') if date.present?
      end

      expose :day, format_with: :exam_day
      expose :time
    end
  
    class Enrollment < Grape::Entity

      expose :name
      expose :lec
      expose :lab
      expose :day
      expose :time
      expose :room
      expose :type
      expose :mid_exam, using: Api::Entities::ExamDay
      expose :final_exam, using: Api::Entities::ExamDay

    end
  end
end
 
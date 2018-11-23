module Api
  class Base < Grape::API
   mount Api::V1::Enrollments
  end
 end
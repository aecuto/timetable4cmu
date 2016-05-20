require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get timetable" do
    get :timetable
    assert_response :success
  end

end

require 'test_helper'

class DevelopersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get developers_index_url
    assert_response :success
  end

end

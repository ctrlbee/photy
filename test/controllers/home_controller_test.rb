require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get viewalbum" do
    get :viewalbum
    assert_response :success
  end

  test "should get newalbum" do
    get :newalbum
    assert_response :success
  end

end

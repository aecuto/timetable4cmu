Rails.application.routes.draw do

  root 'home#index'
  get 'login' => 'home#login'
  get 'logout' => 'home#logout'
  post 'login' => 'home#login'
  get 'developers' => 'developers#index'

end

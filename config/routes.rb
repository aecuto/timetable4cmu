Rails.application.routes.draw do

  root 'home#index'
  get 'login' => 'home#login'
  post 'login' => 'home#login'
  get 'developers' => 'developers#index'

end

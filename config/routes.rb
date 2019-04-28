Rails.application.routes.draw do


  mount Api::Base => '/'

  devise_for :admins
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'enrollments#index'
  get 'enrollments', to: redirect('/')
  post "enrollments" => 'enrollments#show'
  get 'developers' => 'developers#index'
  get '/login', to: redirect('/')

end

Rails.application.routes.draw do

  mount Api::Base => '/'

  resources :bloggers
  devise_for :admins
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'enrollment#index'
  get 'enrollment', to: redirect('/')
  post "enrollment" => 'enrollment#show'

end

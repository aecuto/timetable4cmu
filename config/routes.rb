Rails.application.routes.draw do

  resources :bloggers
  devise_for :admins
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'enrollment#index'
  get 'enrollment/show', to: redirect('/')
  post 'enrollment/show'

end

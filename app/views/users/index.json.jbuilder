json.array!(@users) do |user|
  json.extract! user, :id, :ip, :sid
  json.url user_url(user, format: :json)
end

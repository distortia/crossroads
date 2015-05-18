json.array!(@companies) do |company|
  json.extract! company, :id, :name, :address, :city, :state, :owner, :plan
  json.url company_url(company, format: :json)
end

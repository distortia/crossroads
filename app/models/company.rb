class Company < ActiveRecord::Base
#	has_many: :users
	
	validates :company_name, :owner, :address, :city, :state, :zip, :business_plan, presence: true
	validates :company_name, uniqueness: true
	
end

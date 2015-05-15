class User < ActiveRecord::Base
	belongs_to: :company
	
	validates: fistName, lastName, email, phone, presense: true
	validates: email, uniqueness: true
	
end

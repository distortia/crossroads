class CompanyController < ApplicationController

	def index
		@companies = Company.all
	end
	
	def show
	end
	
	def new
		@company = Company.new
	end
	
	def create
		
	end
	
	def update
	end
	
	def destroy
	end
	
end

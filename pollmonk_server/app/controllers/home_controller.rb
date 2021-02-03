class HomeController < ApplicationController

	before_action :login_required

	def index 
		
		redirect_to "/index.html"
		 
	end

end

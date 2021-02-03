class P99GetUserController < ApplicationController	
	
	skip_before_action :verify_authenticity_token
 
	def get_user_details
		
		@user = current_user

		render json: {status: 'SUCCESS', message: 'user details', data: @user}, status: :ok
	end
	
	def get_user_info
	
		if params[:email_id]
		
			@user = User.where("email = ?", Base64.decode64(params[:email_id]))
		
		end
		
		render json: {status: 'SUCCESS', message: 'user details', data: @user}, status: :ok
	end
end 

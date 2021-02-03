require 'base64'  

class P12MmEmailListController < ApplicationController

	skip_before_action :verify_authenticity_token 

	def index		
		
		if params[:email]
		
			user_email = Base64.decode64(params[:email])
		
			@email_list = P12MmEmailList.where("email_id = ? and status = 'Active'", user_email)
		
		end

		render json: {status: 'SUCCESS', message: 'List of Email list', data: @email_list}, status: :ok
	end

	def show

		@email_list = P12MmEmailList.find(Base64.decode64(params[:id]))

		render json: {status: 'SUCCESS', message: 'Email list Details', data: @email_list}, status: :ok
	end

	def create 
		@email_list = P12MmEmailList.new(create_params)

		if @email_list.save

			render json: {status: 'SUCCESS', message: 'Email list is added', data: @email_list}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Email list', data: @email_list.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		email_list_params['email_list'].each do |email|	
		
			@email_list = P12MmEmailList.new(email)

			if @email_list.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Email list', data: @email_list.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Email list is added', data: @email_list}, status: :ok
		
	end

	def update 
		@email_list = P12MmEmailList.find(Base64.decode64(params[:id]))

		if @email_list.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Email list', data: @email_list}, status: :ok
		else

			#logger.error "ERROR: P12MmEmailList Create: #{@email_list.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Email list', data: @email_list.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@email_list = P12MmEmailList.find(Base64.decode64(params[:id]))

		if @email_list.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Email list', data: @email_list}, status: :ok
		else

			#logger.error "ERROR: P12MmEmailList Create: #{@email_list.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Email list', data: @email_list.errors},
			status: :unprocessable_entity
		end	
	end 
		

	private

	def create_params
	
		params.permit(	:email_id,
						:upload_email,
						:first_name,
						:last_name)
	end

	def update_params
	
		params.permit(	:email_id,
						:upload_email,
						:first_name,
						:last_name)
	end
	
	def email_list_params
	
		params.permit( :email_list => [	:email_id,
										:upload_email,
										:first_name,
										:last_name])
	end	
end 

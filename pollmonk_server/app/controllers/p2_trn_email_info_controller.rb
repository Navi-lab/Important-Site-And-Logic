require 'nexmo'

class P2TrnEmailInfoController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index

		if params[:email] && params[:survey_id]

			@email_info = P2TrnEmailInfo.where("send_to = ? and survey_id = ?", Base64.decode64(params[:email]), Base64.decode64(params[:survey_id]) )

		elsif params[:email_id]

			@email_info = P2TrnEmailInfo.where("email_id = ?", Base64.decode64(params[:email_id]))
			
		else
	
			@email_info = P2TrnEmailInfo.all

		end

		render json: {status: 'SUCCESS', message: 'List of email_info', data: @email_info}, status: :ok
	end

	def show

		@email_info = P2TrnEmailInfo.find(params[:id])

		render json: {status: 'SUCCESS', message: 'email_info Details', data: @email_info}, status: :ok
	end

	def create

		@email_info = P2TrnEmailInfo.new(create_params)

		if @email_info.save
			
			deliver @email_info

			render json: {status: 'SUCCESS', message: 'email_info is added', data: @email_info}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create email_info', data: @email_info.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@email_info = P2TrnEmailInfo.find(params[:id])

		if @email_info.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated email_info', data: @email_info}, status: :ok
		else

			#logger.error "ERROR: P2TrnEmailInfo Create: #{@email_info.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating email_info', data: @email_info.errors},
			status: :unprocessable_entity
		end
	end
	
	def deliver sms
		client = Nexmo::Client.new(api_key: ENV['NEXMO_API_KEY'], api_secret: ENV['NEXMO_API_SECRET'])
		client.sms.send(
		  from: sms['email_id'],
		  to: "91#{sms['send_to']}",
		  text: sms['email_body']
		)
	end

	private

	def create_params
		params.permit(	:send_to,
						:subject,
						:email_body,
						:url_link,
						:email_id,
						:survey_id)
	end

	def update_params
		params.permit(	:send_to,
						:subject,
						:email_body,
						:url_link,
						:email_id,
						:survey_id)
	end
end 

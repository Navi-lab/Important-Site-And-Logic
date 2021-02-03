require 'base64'  

class P2TrnFeedbackController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index

		if params[:user_info] && params[:survey_id]

			@feedback = P2TrnFeedback.where("user_info = ? and survey_id = ?", Base64.decode64(params[:user_info]), Base64.decode64(params[:survey_id]))
			
		elsif params[:survey_id]

			@feedback = P2TrnFeedback.where("survey_id = ?", Base64.decode64(params[:survey_id]))

		elsif params[:email_id]

			@feedback = P2TrnFeedback.where("email_id = ?", Base64.decode64(params[:email_id]))
		
		else

			@feedback = P2TrnFeedback.all

		end

		render json: {status: 'SUCCESS', message: 'List of Feedback', data: @feedback}, status: :ok
	end

	def show

		@feedback = P2TrnFeedback.find(Base64.decode64(params[:id]))

		render json: {status: 'SUCCESS', message: 'Feedback Details', data: @feedback}, status: :ok
	end

	def create

		@input_data  = create_params
		
		#@input_data['host_ip'] = request.env['HTTP_CLIENT_IP']	
		
		@user_agent = request.headers['User-Agent']
		
		#logger.error request.headers['User-Agent'].inspect
		
		client = DeviceDetector.new(@user_agent)
		
		@result = {
					'browser_name': client.name,
					'browser_version': client.full_version,
					'os_name': client.os_name,
					'os_version': client.os_full_version,
					'device_name': client.device_name,
					'device_type': client.device_type
		
				}

		@new_data = {
						'user_info': Base64.decode64(@input_data['user_info']),
						'email_id': @input_data['email_id'],
						'survey_id': @input_data['survey_id'],
						'host_ip': request.env['HTTP_CLIENT_IP'],
						'device_info': @result,
						'feedback_type': @input_data['feedback_type']
					}

		#logger.error @new_data.inspect

		@feedback = P2TrnFeedback.new(@new_data)

		if @feedback.save

			render json: {status: 'SUCCESS', message: 'Feedback is added', data: @feedback}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Feedback', data: @feedback.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@feedback = P2TrnFeedback.find(params[:id])

		if @feedback.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Feedback', data: @feedback}, status: :ok
		else

			#logger.error "ERROR: P2TrnFeedback Create: #{@feedback.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Feedback', data: @feedback.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_params
		params.permit(	:email_id,
						:survey_id,
						:user_info,
						:feedback_type)
	end

	def update_params
		params.permit(	:email_id,
						:survey_id,
						:user_info)
	end
end 

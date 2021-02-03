require 'base64'

class P2TrnFeedbackContactInfoController < ApplicationController 

	skip_before_action :verify_authenticity_token

	def index 
	
		if params[:survey_id]

			survey_id = Base64.decode64(params[:survey_id])
		
			@feedback_contact = P2TrnFeedbackContactInfo.where("survey_id = ?", survey_id).order('id')
			
		elsif params[:survey_q_id]

			survey_id = Base64.decode64(params[:survey_q_id])
		
			@feedback_contact = P2TrnFeedbackContactInfo.where("survey_q_id = ?", survey_id).order('id')
			
		else

			@feedback_contact = P2TrnFeedbackContactInfo.all
			
		end

		render json: {status: 'SUCCESS', message: 'List of Survey Contact', data: @feedback_contact}, status: :ok
	end

	def show

		@feedback_contact = P2TrnFeedbackContactInfo.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Question Details', data: @feedback_contact}, status: :ok
	end

	def create
		@feedback_contact = P2TrnFeedbackContactInfo.new(create_upd_params)

		if @feedback_contact.save

			render json: {status: 'SUCCESS', message: 'Survey Question is added', data: @feedback_contact}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Contact', data: @feedback_contact.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		feedback_contact_params['feedback_contact'].each do |contact|	
		
			@feedback_contact = P2TrnFeedbackContactInfo.new(contact)

			if @feedback_contact.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Contact', data: @feedback_contact.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Contact is added', data: @feedback_contact}, status: :ok
		
	end

	def update 
		@feedback_contact = P2TrnFeedbackContactInfo.find(params[:id])

		if @feedback_contact.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Contact', data: @feedback_contact}, status: :ok
		else

			#logger.error "ERROR: P2TrnFeedbackContactInfo Create: #{@feedback_contact.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Contact', data: @feedback_contact.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@feedback_contact = P2TrnFeedbackContactInfo.find(Base64.decode64(params[:id]))

		if @feedback_contact.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey Contact', data: @feedback_contact}, status: :ok
		else

			#logger.error "ERROR: P2TrnFeedbackContactInfo Create: #{@feedback_contact.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey Contact', data: @feedback_contact.errors},
			status: :unprocessable_entity
		end	
	end

	private

	def create_upd_params
		params.permit(	:feedback_id,
						:survey_id,
						:survey_q_id,
						:contact_info_id,
						:contact_info_value)
	end
	
	def feedback_contact_params
	
		params.permit( :feedback_contact => [	:feedback_id,
												:survey_id,
												:survey_q_id,
												:contact_info_id,
												:contact_info_value])
	end	
end 

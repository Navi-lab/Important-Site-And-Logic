require 'base64'

class P12MmSurveyContactInfoController < ApplicationController 

	skip_before_action :verify_authenticity_token

	def index 
	
		if params[:survey_q_id]
		
			@survey_contact = P12MmSurveyContactInfo.where("survey_q_id = ?", Base64.decode64(params[:survey_q_id])).order('id')
			
		elsif params[:get_contacts]
		
			@survey_contact = P12MmSurveyContactInfo.joins(:p2_trn_feedback_contact_info).select("p12_mm_survey_contact_infos.contact_info_label, p2_trn_feedback_contact_infos.contact_info_value, p2_trn_feedback_contact_infos.survey_id,
			p2_trn_feedback_contact_infos.survey_q_id").where("p12_mm_survey_contact_infos.survey_id = ?", Base64.decode64(params[:get_contacts]))
			
		else

			@survey_contact = P12MmSurveyContactInfo.all
			
		end

		render json: {status: 'SUCCESS', message: 'List of Survey Contact', data: @survey_contact}, status: :ok
	end

	def show

		@survey_contact = P12MmSurveyContactInfo.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Question Details', data: @survey_contact}, status: :ok
	end

	def create
		@survey_contact = P12MmSurveyContactInfo.new(create_upd_params)

		if @survey_contact.save

			render json: {status: 'SUCCESS', message: 'Survey Question is added', data: @survey_contact}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Contact', data: @survey_contact.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		survey_contact_params['survey_contact'].each do |contact|	
		
			@survey_contact = P12MmSurveyContactInfo.new(contact)

			if @survey_contact.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Contact', data: @survey_contact.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Contact is added', data: @survey_contact}, status: :ok
		
	end

	def update 
		@survey_contact = P12MmSurveyContactInfo.find(params[:id])

		if @survey_contact.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Contact', data: @survey_contact}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveyContactInfo Create: #{@survey_contact.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Contact', data: @survey_contact.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@survey_contact = P12MmSurveyContactInfo.find(Base64.decode64(params[:id]))

		if @survey_contact.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey Contact', data: @survey_contact}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveyContactInfo Create: #{@survey_contact.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey Contact', data: @survey_contact.errors},
			status: :unprocessable_entity
		end	
	end
	
	def batch_delete
		
		survey_delete_params['survey_delete'].each do |id|	
						
			@survey_contact = P12MmSurveyContactInfo.find(id[:id]);

			if @survey_contact.destroy

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Contact', data: @survey_contact.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Contact is added', data: @survey_contact}, status: :ok
		
	end

	private

	def create_upd_params
		params.permit(	:survey_id,
						:survey_q_id,
						:contact_info_type,
						:contact_info_label)
	end
	
	def survey_contact_params
	
		params.permit( :survey_contact => [	:survey_id,
											:survey_q_id,
											:contact_info_type,
											:contact_info_label])
	end	
	
	def survey_delete_params
	
		params.permit( :survey_delete => [:id])
	end	
end 

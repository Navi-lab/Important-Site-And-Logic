require 'base64'

class P12MmSurveyDateinfoController < ApplicationController

	skip_before_action :verify_authenticity_token
 
	def index
	
		if params[:survey_id]

			survey_id = Base64.decode64(params[:survey_id])
		
			@date_info = P12MmSurveyDateinfo.where("survey_id = ?", survey_id).order("survey_q_id, id")			
			
		end 
		
		if params[:survey_q_id]

			survey_id = Base64.decode64(params[:survey_q_id])
		
			@date_info = P12MmSurveyDateinfo.where("survey_q_id = ?", survey_id)
			
		end 


		render json: {status: 'SUCCESS', message: 'List of Durvey dateinfo', data: @date_info}, status: :ok
	end

	def show

		@date_info = P12MmSurveyDateinfo.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Durvey dateinfo Details', data: @date_info}, status: :ok
	end

	def create
	
		@date_info = P12MmSurveyDateinfo.new(create_upd_params)

		if @date_info.save

			render json: {status: 'SUCCESS', message: 'Durvey dateinfo is added', data: @date_info}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Durvey dateinfo', data: @date_info.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		survey_answer_params['survey_answers'].each do |answers|	
		
			@date_info = P12MmSurveyDateinfo.new(answers)

			if @date_info.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Durvey dateinfo', data: @date_info.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Durvey dateinfo is added', data: @date_info}, status: :ok
		
	end

	def update 
	
		@date_info = P12MmSurveyDateinfo.find(params[:id])

		if @date_info.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Durvey dateinfo', data: @date_info}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveyDateinfo Create: #{@date_info.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Durvey dateinfo', data: @date_info.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@date_info = P12MmSurveyDateinfo.find(params[:id])

		if @date_info.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Durvey dateinfo', data: @date_info}, status: :ok
			
		else

			#logger.error "ERROR: P12MmSurveyDateinfo Create: #{@date_info.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Durvey dateinfo', data: @date_info.errors},
			status: :unprocessable_entity
		end	
	end
	 
	def batch_delete
		
		survey_delete_params['survey_delete'].each do |id|	
						
			@date_info = P12MmSurveyDateinfo.find(id[:id]);

			if @date_info.destroy

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Durvey dateinfo', data: @date_info.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Durvey dateinfo is added', data: @date_info}, status: :ok
		
	end
 
	private

	def create_upd_params
		params.permit(	:survey_id,
						:survey_q_id,
						:display_label,
						:date_info,
						:time_info,
						:error_message,
						:date_format)
	end
	
	def survey_answer_params
	
		params.permit( :survey_answers => [	:survey_id,
											:survey_q_id,
											:display_label,
											:date_info,
											:time_info,
											:error_message,
											:date_format])
	end	
	
	def survey_delete_params
	
		params.permit( :survey_delete => [:id])
	end	
end 

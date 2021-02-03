require 'base64'

class P12MmSurveySliderController < ApplicationController

	skip_before_action :verify_authenticity_token
 
	def index
	
		if params[:survey_id]

			survey_id = Base64.decode64(params[:survey_id])
		
			@survey_slider = P12MmSurveySlider.where("survey_id = ?", survey_id).order("survey_q_id, id")			
			
		end 
		
		if params[:survey_q_id]

			survey_id = Base64.decode64(params[:survey_q_id])
		
			@survey_slider = P12MmSurveySlider.where("survey_q_id = ?", survey_id)
			
		end 


		render json: {status: 'SUCCESS', message: 'List of Survey Slider', data: @survey_slider}, status: :ok
	end

	def show

		@survey_slider = P12MmSurveySlider.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Slider Details', data: @survey_slider}, status: :ok
	end

	def create
	
		@survey_slider = P12MmSurveySlider.new(create_upd_params)

		if @survey_slider.save

			render json: {status: 'SUCCESS', message: 'Survey Slider is added', data: @survey_slider}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Slider', data: @survey_slider.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		survey_answer_params['survey_answers'].each do |answers|	
		
			@survey_slider = P12MmSurveySlider.new(answers)

			if @survey_slider.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Slider', data: @survey_slider.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Slider is added', data: @survey_slider}, status: :ok
		
	end

	def update 
	
		@survey_slider = P12MmSurveySlider.find(params[:id])

		if @survey_slider.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Slider', data: @survey_slider}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveySlider Create: #{@survey_slider.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Slider', data: @survey_slider.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@survey_slider = P12MmSurveySlider.find(params[:id])

		if @survey_slider.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey Slider', data: @survey_slider}, status: :ok
			
		else

			#logger.error "ERROR: P12MmSurveySlider Create: #{@survey_slider.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey Slider', data: @survey_slider.errors},
			status: :unprocessable_entity
		end	
	end
	 
	def batch_delete
		
		survey_delete_params['survey_delete'].each do |id|	
						
			@survey_slider = P12MmSurveySlider.find(id[:id]);

			if @survey_slider.destroy

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Slider', data: @survey_slider.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Slider is added', data: @survey_slider}, status: :ok
		
	end
 
	private

	def create_upd_params
		params.permit(	:survey_id,
						:survey_q_id,
						:first_value,
						:middle_value,
						:last_value)
	end
	
	def survey_answer_params
	
		params.permit( :survey_answers => [	:survey_id,
											:survey_q_id,
											:first_value,
											:middle_value,
											:last_value])
	end	
	
	def survey_delete_params
	
		params.permit( :survey_delete => [:id])
	end	
end 

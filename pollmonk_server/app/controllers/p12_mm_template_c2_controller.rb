require 'base64'

class P12MmTemplateC2Controller < ApplicationController

	skip_before_action :verify_authenticity_token

	def index 

		if params[:template_id]

			@temp_grade = P12MmTemplateC2.where("template_id = ?", Base64.decode64(params[:template_id]))
			
		end
		
		if params[:question_id]

			@temp_grade = P12MmTemplateC2.where("template_q_id = ?", Base64.decode64(params[:question_id]))
			
		end
			
		if params[:category]

			@temp_grade = P12MmTemplateC2.where("template_id in (select id from p12_mm_templates where survey_category = ?)", Base64.decode64(params[:category]))
			
		end

		if params[:all]

			@temp_grade = P12MmTemplateC2.all

		end

		render json: {status: 'SUCCESS', message: 'List of Template Grade', data: @temp_grade}, status: :ok
	end

	def show

		@temp_grade = P12MmTemplateC2.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Template Grade Details', data: @temp_grade}, status: :ok
	end

	def create
		@temp_grade = P12MmTemplateC2.new(create_upd_params)

		if @temp_grade.save

			render json: {status: 'SUCCESS', message: 'Template Grade is added', data: @temp_grade}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Template Grade', data: @temp_grade.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		temp_answer_params['survey_answers'].each do |answers|	
		
			@temp_grade = P12MmTemplateC2.new(answers)

			if @temp_grade.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Template Grade', data: @temp_grade.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Template Grade is added', data: @temp_grade}, status: :ok
		
	end

	def update 
		@temp_grade = P12MmTemplateC2.find(params[:id])

		if @temp_grade.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Template Grade', data: @temp_grade}, status: :ok
		else

			#logger.error "ERROR: P12MmTemplateC2 Create: #{@temp_grade.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Template Grade', data: @temp_grade.errors},
			status: :unprocessable_entity
		end
	end
 
	private

	def create_upd_params
		params.permit(	:template_id,
						:template_q_id,
						:answer)
	end
	
	def temp_answer_params
	
		params.permit( :survey_answers => [	:template_id,
											:template_q_id,
											:answer])
	end	
end 

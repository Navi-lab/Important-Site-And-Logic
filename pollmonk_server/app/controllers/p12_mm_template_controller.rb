require 'base64' 

class P12MmTemplateController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index
		
		if params[:pre_questions]

			#@template = P12MmTemplate.joins(:p12_mm_template_c1, :p12_mm_template_c2).all

			@template = P12MmTemplate.joins("INNER JOIN p12_mm_template_c1s ON p12_mm_template_c1s.template_id = p12_mm_templates.id").all
		end
		
		if params[:survey_category]
			
			@template = P12MmTemplate.where("survey_category =?", Base64.decode64(params[:survey_category]))
		
		end
		
		if params[:temp_cat_all]
			
			@template = P12MmTemplate.select("survey_category").distinct.order('survey_category')
		
		end
		
		if params[:template_all]
			
			@template = P12MmTemplate.all
		
		end

		render json: {status: 'SUCCESS', message: 'List of Template', data: @template}, status: :ok
	end

	def show

		@template = P12MmTemplate.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Template Details', data: @template}, status: :ok
	end

	def create
		@template = P12MmTemplate.new(create_params)

		if @template.save

			render json: {status: 'SUCCESS', message: 'Template is added', data: @template}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Template', data: @template.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@template = P12MmTemplate.find(params[:id])

		if @template.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Template', data: @template}, status: :ok
		else

			#logger.error "ERROR: P12MmTemplate Create: #{@template.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Template', data: @template.errors},
			status: :unprocessable_entity
		end

	end

	private

	def create_params
		params.permit(	:template_name, 
						:survey_category,
						:description,
						:no_question,
						:no_time_used,
						:time_spent)
	end

	def update_params
		params.permit(	:template_name, 
						:survey_category,
						:no_question,
						:no_time_used,
						:description,
						:time_spent,
						:status)
	end
end 

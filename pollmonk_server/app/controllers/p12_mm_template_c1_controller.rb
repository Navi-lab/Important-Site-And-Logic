require 'base64'  

class P12MmTemplateC1Controller < ApplicationController

	skip_before_action :verify_authenticity_token

	def index

		if params[:template_id]

			@template_ques = P12MmTemplateC1.where("template_id = ?", Base64.decode64(params[:template_id]))

		end

		if params[:category]

			@template_ques = P12MmTemplateC1.where("template_id in (select id from p12_mm_templates where survey_category = ?)", Base64.decode64(params[:category]))

		end

		render json: {status: 'SUCCESS', message: 'List of Templates Questions', data: @template_ques}, status: :ok
	end

	def show

		@template_ques = P12MmTemplateC1.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Templates Question Details', data: @template_ques}, status: :ok
	end

	def create
		@template_ques = P12MmTemplateC1.new(create_upd_params)

		if @template_ques.save

			render json: {status: 'SUCCESS', message: 'Templates Question is added', data: @template_ques}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Templates Questions', data: @template_ques.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@template_ques = P12MmTemplateC1.find(params[:id])

		if @template_ques.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Templates Questions', data: @template_ques}, status: :ok
		else

			#logger.error "ERROR: P12MmTemplateC1 Create: #{@template_ques.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Templates Questions', data: @template_ques.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_upd_params
		params.permit(	:template_id,
						:question,
						:answer_type)
	end
end 

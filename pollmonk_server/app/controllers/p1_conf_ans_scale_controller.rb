require 'base64'

class P1ConfAnsScaleController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index
		
		if params[:ans_abbr]
			
			@ans_scale = P1ConfAnsScale.select("answer_abbr").distinct
			
		elsif params[:ans_scale]
		
			@ans_scale = P1ConfAnsScale.select("ans_scale").where("answer_abbr = ?", Base64.decode64(params[:ans_scale]))
		end

		render json: {status: 'SUCCESS', message: 'List of AnsScale', data: @ans_scale}, status: :ok
	end

	def show

		@ans_scale = P1ConfAnsScale.find(params[:id])

		render json: {status: 'SUCCESS', message: 'AnsScale Details', data: @ans_scale}, status: :ok
	end

	def create
		@ans_scale = P1ConfAnsScale.new(create_params)

		if @ans_scale.save

			render json: {status: 'SUCCESS', message: 'AnsScale is added', data: @ans_scale}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create AnsScale', data: @ans_scale.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@ans_scale = P1ConfAnsScale.find(params[:id])

		if @ans_scale.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated AnsScale', data: @ans_scale}, status: :ok
		else

			#logger.error "ERROR: P1ConfAnsScale Create: #{@ans_scale.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating AnsScale', data: @ans_scale.errors},
			status: :unprocessable_entity
		end
	end
 
	private

	def create_params
		params.permit(	:ans_scale,
						:answer_abbr)
	end

	def update_params
		params.permit(	:ans_scale,
						:answer_abbr,
						:status)
	end
end 

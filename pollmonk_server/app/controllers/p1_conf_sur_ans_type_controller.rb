class P1ConfSurAnsTypeController < ApplicationController
  
	skip_before_action :verify_authenticity_token

	def index

		@sur_ans_type = P1ConfSurAnsType.where("status='Active'").order("id")

		render json: {status: 'SUCCESS', message: 'List of Survey Answer Type', data: @sur_ans_type}, status: :ok
	end

	def show

		@sur_ans_type = P1ConfSurAnsType.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Survey Answer Type Details', data: @sur_ans_type}, status: :ok
	end

	def create
		@sur_ans_type = P1ConfSurAnsType.new(create_params)

		if @sur_ans_type.save

			render json: {status: 'SUCCESS', message: 'Survey Answer Type is added', data: @sur_ans_type}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Answer Type', data: @sur_ans_type.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@sur_ans_type = P1ConfSurAnsType.find(params[:id])

		if @sur_ans_type.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Answer Type', data: @sur_ans_type}, status: :ok
		else

			#logger.error "ERROR: P1ConfSurAnsType Create: #{@sur_ans_type.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Answer Type', data: @sur_ans_type.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_params
		params.permit(	:answer_type )
	end

	def update_params
		params.permit(	:answer_type,
						:status )
	end
end 

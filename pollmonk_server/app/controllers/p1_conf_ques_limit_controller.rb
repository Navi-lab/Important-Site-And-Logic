class P1ConfQuesLimitController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index 

		@ques_limit = P1ConfQuesLimit.all

		render json: {status: 'SUCCESS', message: 'List of Question Limit', data: @ques_limit}, status: :ok
	end

	def show

		@ques_limit = P1ConfQuesLimit.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Question Limit Details', data: @ques_limit}, status: :ok
	end

	def create
		@ques_limit = P1ConfQuesLimit.new(create_upd_params)

		if @ques_limit.save

			render json: {status: 'SUCCESS', message: 'Question Limit is added', data: @ques_limit}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Question Limit', data: @ques_limit.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@ques_limit = P1ConfQuesLimit.find(params[:id])

		if @ques_limit.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Question Limit', data: @ques_limit}, status: :ok
		else

			#logger.error "ERROR: P1ConfQuesLimit Create: #{@ques_limit.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Question Limit', data: @ques_limit.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_upd_params
		params.permit(	:ques_limit )
	end
end 

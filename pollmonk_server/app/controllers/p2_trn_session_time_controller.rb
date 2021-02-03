class P2TrnSessionTimeController < ApplicationController
  
	skip_before_action :verify_authenticity_token

	def index

		@session_time = P2TrnSessionTime.all

		render json: {status: 'SUCCESS', message: 'List of Session', data: @session_time}, status: :ok
	end

	def show

		@session_time = P2TrnSessionTime.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Session Details', data: @session_time}, status: :ok
	end

	def create
		@session_time = P2TrnSessionTime.new(create_params)

		if @session_time.save

			render json: {status: 'SUCCESS', message: 'Session is added', data: @session_time}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Session', data: @session_time.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@session_time = P2TrnSessionTime.find(params[:id])

		if @session_time.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Session', data: @session_time}, status: :ok
		else

			#logger.error "ERROR: P2TrnSessionTime Create: #{@session_time.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Session', data: @session_time.errors},
			status: :unprocessable_entity
		end
	end

	private

	def create_params
		params.permit(	:user_id,
						:survey_id,
						:started_at,
						:ended_at)
	end

	def update_params
		params.permit(	:user_id,
						:survey_id,
						:started_at,
						:ended_at)
	end
end 

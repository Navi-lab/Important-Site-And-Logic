require 'base64'

class P2TrnFeedbackMatrixController < ApplicationController 

	skip_before_action :verify_authenticity_token

	def index 
	
		if params[:survey_id]

			survey_id = Base64.decode64(params[:survey_id])
		
			@feedback_matrix = P2TrnFeedbackMatrix.where("survey_id = ?", survey_id).order('id')
			
		elsif params[:survey_q_id]

			survey_id = Base64.decode64(params[:survey_q_id])
		
			@feedback_matrix = P2TrnFeedbackMatrix.where("survey_q_id = ?", survey_id).order('id')
			
		else

			@feedback_matrix = P2TrnFeedbackMatrix.all
			
		end

		render json: {status: 'SUCCESS', message: 'List of Survey Matrix', data: @feedback_matrix}, status: :ok
	end

	def show

		@feedback_matrix = P2TrnFeedbackMatrix.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Question Details', data: @feedback_matrix}, status: :ok
	end

	def create
		@feedback_matrix = P2TrnFeedbackMatrix.new(create_upd_params)

		if @feedback_matrix.save

			render json: {status: 'SUCCESS', message: 'Survey Question is added', data: @feedback_matrix}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Matrix', data: @feedback_matrix.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		feedback_matrix_params['feedback_matrix'].each do |contact|	
		
			@feedback_matrix = P2TrnFeedbackMatrix.new(contact)

			if @feedback_matrix.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Matrix', data: @feedback_matrix.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Matrix is added', data: @feedback_matrix}, status: :ok
		
	end

	def update 
		@feedback_matrix = P2TrnFeedbackMatrix.find(params[:id])

		if @feedback_matrix.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Matrix', data: @feedback_matrix}, status: :ok
		else

			#logger.error "ERROR: P2TrnFeedbackMatrix Create: #{@feedback_matrix.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Matrix', data: @feedback_matrix.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@feedback_matrix = P2TrnFeedbackMatrix.find(Base64.decode64(params[:id]))

		if @feedback_matrix.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey Matrix', data: @feedback_matrix}, status: :ok
		else

			#logger.error "ERROR: P2TrnFeedbackMatrix Create: #{@feedback_matrix.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey Matrix', data: @feedback_matrix.errors},
			status: :unprocessable_entity
		end	
	end

	private

	def create_upd_params
		params.permit(	:feedback_id,
						:survey_id,
						:survey_q_id,
						:matrix_row_id,
						:matrix_column_id)
	end
	
	def feedback_matrix_params
	
		params.permit( :feedback_matrix => [	:feedback_id,
												:survey_id,
												:survey_q_id,
												:matrix_row_id,
												:matrix_column_id])
	end	
end 

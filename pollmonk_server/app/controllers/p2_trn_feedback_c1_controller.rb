require 'base64' 

class P2TrnFeedbackC1Controller < ApplicationController

	skip_before_action :verify_authenticity_token
 
	def index
	
		if params[:survey_id]  
			
			@feedback_content = P2TrnFeedbackC1.select("survey_id, survey_q_id, survey_grade_id, survey_answer, count(survey_grade_id) as no_response").where("survey_id = ?", Base64.decode64(params[:survey_id])).group("survey_id, survey_q_id, survey_grade_id, survey_answer, id").order("survey_q_id, id")

			#@feedback_content = P2TrnFeedbackC1.select("survey_id, survey_q_id, survey_grade_id").where("survey_id = ?", Base64.decode64(params[:survey_id]))
		else
		
			@feedback_content = P2TrnFeedbackC1.all
			
		end

		render json: {status: 'SUCCESS', message: 'List of Feedback Content', data: @feedback_content}, status: :ok
	end

	def show

		@feedback_content = P2TrnFeedbackC1.find(params[:id])

		render json: {status: 'SUCCESS', message: 'Feedback Content Details', data: @feedback_content}, status: :ok
	end

	def create
		@feedback_content = P2TrnFeedbackC1.new(create_params)

		if @feedback_content.save

			render json: {status: 'SUCCESS', message: 'Feedback Content is added', data: @feedback_content}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Feedback Content', data: @feedback_content.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		feedback_content_params['feedback_content'].each do |answers|	
		
			@feedback_content = P2TrnFeedbackC1.new(answers)

			if @feedback_content.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Feedback Content', data: @feedback_content.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Feedback Content is added', data: @feedback_content}, status: :ok
		
	end

	def update 
		@feedback_content = P2TrnFeedbackC1.find(params[:id])

		if @feedback_content.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Feedback Content', data: @feedback_content}, status: :ok
		else

			#logger.error "ERROR: P2TrnFeedbackC1 Create: #{@feedback_content.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Feedback Content', data: @feedback_content.errors},
			status: :unprocessable_entity
		end
	end 

	private

	def create_params
		params.permit(	:feedback_id,
						:survey_id,
						:survey_q_id,
						:survey_grade_id,
						:survey_answer)
	end

	def update_params
		params.permit(	:feedback_id,
						:survey_id,
						:survey_q_id,
						:survey_grade_id,
						:survey_answer)
	end
	
	def feedback_content_params
	
		params.permit( :feedback_content => [	:feedback_id,
												:survey_id,
												:survey_q_id,
												:survey_grade_id,
												:survey_answer
											])
	end	
end 

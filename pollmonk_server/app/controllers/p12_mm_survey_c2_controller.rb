require 'base64'

class P12MmSurveyC2Controller < ApplicationController

	skip_before_action :verify_authenticity_token
 
	def index
	
		if params[:survey_id]

			survey_id = Base64.decode64(params[:survey_id])
		
			@survey_grade = P12MmSurveyC2.where("survey_id = ?", survey_id).order("survey_q_id, id")
			
		#else

			#@survey_grade = P12MmSurveyC2.all
			
		end 
		
		if params[:analytic_id] 

			analytic_id = Base64.decode64(params[:analytic_id])
		
			@survey_grade = P12MmSurveyC2.where("id in (select survey_grade_id from p2_trn_feedback_c1s where survey_id=?)", analytic_id)
			
		end
		
		if params[:edit_question]
		
			question_id = Base64.decode64(params[:edit_question])
			
			@survey_grade = P12MmSurveyC2.where("survey_q_id = ?", question_id)

			#@survey_grade = P12MmSurveyC2.where("survey_q_id = ?", params[:edit_question])
		
		end

		render json: {status: 'SUCCESS', message: 'List of Survey Grade', data: @survey_grade}, status: :ok
	end

	def show

		@survey_grade = P12MmSurveyC2.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Grade Details', data: @survey_grade}, status: :ok
	end

	def create
	
		@survey_grade = P12MmSurveyC2.new(create_upd_params)

		if @survey_grade.save

			render json: {status: 'SUCCESS', message: 'Survey Grade is added', data: @survey_grade}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Grade', data: @survey_grade.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
		
		survey_answer_params['survey_answers'].each do |answers|	
		
			@survey_grade = P12MmSurveyC2.new(answers)

			if @survey_grade.save

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Grade', data: @survey_grade.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Grade is added', data: @survey_grade}, status: :ok
		
	end

	def update 
	
		@survey_grade = P12MmSurveyC2.find(params[:id])

		if @survey_grade.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Grade', data: @survey_grade}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveyC2 Create: #{@survey_grade.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Grade', data: @survey_grade.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@survey_grade = P12MmSurveyC2.find(params[:id])

		if @survey_grade.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey Grade', data: @survey_grade}, status: :ok
			
		else

			#logger.error "ERROR: P12MmSurveyC2 Create: #{@survey_grade.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey Grade', data: @survey_grade.errors},
			status: :unprocessable_entity
		end	
	end
	 
	def batch_delete
		
		survey_delete_params['survey_delete'].each do |id|	
						
			@survey_grade = P12MmSurveyC2.find(id[:id]);

			if @survey_grade.destroy

				
			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Grade', data: @survey_grade.errors},
				status: :unprocessable_entity
			end
		
		end
		
		render json: {status: 'SUCCESS', message: 'Survey Grade is added', data: @survey_grade}, status: :ok
		
	end
  
	private

	def create_upd_params
		params.permit(	:survey_id,
						:survey_q_id,
						:answer)
	end
	
	def survey_answer_params
	
		params.permit( :survey_answers => [	:survey_id,
											:survey_q_id,
											:answer])
	end	
	
	def survey_delete_params
	
		params.permit( :survey_delete => [:id])
	end	
end 

require 'base64'

class P12MmSurveyMatrixController < ApplicationController
	
	skip_before_action :verify_authenticity_token

	def index
  
		if params[:survey_id]
			survey_id 		= Base64.decode64(params[:survey_id])
			@survey_grade 	= P12MmSurveyMatrix.where("survey_id = ?", survey_id).order("survey_q_id, id")
		end

		if params[:survey_q_id]

			survey_id 		= Base64.decode64(params[:survey_q_id])
			@survey_grade 	= P12MmSurveyMatrix.where("survey_q_id = ?", survey_id)
		end
		
		if params[:edit_question]      
			question_id 	= Base64.decode64(params[:edit_question])
			@survey_grade 	= P12MmSurveyMatrix.where("survey_q_id = ?", question_id)
		end
		
		render json: {status: 'SUCCESS', message: 'List of Survey Grade', data: @survey_grade}, status: :ok
	
	end

	def show
		@survey_grade = P12MmSurveyMatrix.find(Base64.decode64(paramsparams[:id]))
		render json: {status: 'SUCCESS', message: 'Survey Grade Details', data: @survey_grade}, status: :ok
	end

	def create
		@survey_grade = P12MmSurveyMatrix.new(create_upd_params)
		if @survey_grade.save
			render json: {status: 'SUCCESS', message: 'Survey Grade is added', data: @survey_grade}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Grade', data: @survey_grade.errors},
			status: :unprocessable_entity
		end
	end

	def create_matrix_ans
	
		params[:feedback_file][0]['answer'].each_pair do |key, val|
		
		  @survey_grade = P12MmSurveyMatrix.find(key.to_i)
		  @survey_grade.matrix_answer = P12MmSurveyMatrix.find(val.to_i).matrix_label
		  @survey_grade.save
		  
		end
		render json:{status: 'SUCCESS', message: 'Updated Survey Answer', data: @survey_grade}, status: :ok
	end

	def batch_create
		survey_answer_params['survey_answers'].each do |answers|
			@survey_grade = P12MmSurveyMatrix.new(answers)
			if @survey_grade.save

			else
				render json:{status: 'ERROR', message: 'Unable to create Survey Grade', data: @survey_grade.errors},
				status: :unprocessable_entity
			end
		end
		render json: {status: 'SUCCESS', message: 'Survey Grade is added', data: @survey_grade}, status: :ok
	end

	def update
		@survey_grade = P12MmSurveyMatrix.find(params[:id])
		if @survey_grade.update_attributes( create_upd_params)
			render json:{status: 'SUCCESS', message: 'Updated Survey Grade', data: @survey_grade}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Error while updating Survey Grade', data: @survey_grade.errors},
			status: :unprocessable_entity
		end
	end

	def destroy
		@survey_grade = P12MmSurveyMatrix.find(params[:id])
		if @survey_grade.destroy
			render json:{status: 'SUCCESS', message: 'Deleted Survey Grade', data: @survey_grade}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Error while deleting Survey Grade', data: @survey_grade.errors},
			status: :unprocessable_entity
		end
	end

	def batch_delete
		survey_delete_params['survey_delete'].each do |id|
			@survey_grade = P12MmSurveyMatrix.find(id[:id]);
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
		params.permit(:survey_id, :survey_q_id, :matrix_type, :matrix_value, :matrix_ans_type)
	end

	def survey_answer_params
		params.permit(:survey_answers => [:survey_id, :survey_q_id, :matrix_type, :matrix_value, :matrix_ans_type])
	end

	def survey_delete_params
		params.permit( :survey_delete => [:id])
	end

end

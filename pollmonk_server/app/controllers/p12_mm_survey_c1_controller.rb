require 'base64'

class P12MmSurveyC1Controller < ApplicationController 

	skip_before_action :verify_authenticity_token

	def index 
	
		if params[:survey_id]

			survey_id = Base64.decode64(params[:survey_id])
		
			@survey_ques = P12MmSurveyC1.where("survey_id = ?", survey_id).order('sl_no')
			
		elsif params[:survey] && params[:survey_ques] && params[:survey_type]
		
			@survey_ques = ActiveRecord::Base.connection.execute("SELECT p12_mm_survey_c1s(\'" + Base64.decode64(params[:survey]) + "\', \'" + Base64.decode64(params[:survey_ques])+ "\', \'" + Base64.decode64(params[:survey_type]) + "\')")
			
		elsif params[:survey_q] && params[:survey_q_ques] && params[:survey_q_type] && params[:survey_q_id]
		
			@survey_ques = ActiveRecord::Base.connection.execute("SELECT p12_mm_survey_c1s_edit(\'" + Base64.decode64(params[:survey_q]) + "\', \'" + Base64.decode64(params[:survey_q_ques])+ "\', \'" + Base64.decode64(params[:survey_q_type]) + "\', \'" + Base64.decode64(params[:survey_q_id]) + "\')")
			
		elsif params[:get_group]
			
			survey_id = Base64.decode64(params[:get_group])
			
			@survey_ques = P12MmSurveyC1.select('question_section_name').where("survey_id = ?", survey_id).distinct
			
		else

			@survey_ques = P12MmSurveyC1.all
			
		end

		render json: {status: 'SUCCESS', message: 'List of Survey Questions', data: @survey_ques}, status: :ok
	end

	def show

		@survey_ques = P12MmSurveyC1.find(Base64.decode64(paramsparams[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Question Details', data: @survey_ques}, status: :ok
	end

	def create
		@survey_ques = P12MmSurveyC1.new(create_upd_params)

		if @survey_ques.save

			render json: {status: 'SUCCESS', message: 'Survey Question is added', data: @survey_ques}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey Questions', data: @survey_ques.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@survey_ques = P12MmSurveyC1.find(params[:id])

		if @survey_ques.update_attributes( create_upd_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey Questions', data: @survey_ques}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveyC1 Create: #{@survey_ques.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey Questions', data: @survey_ques.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@survey_ques = P12MmSurveyC1.find(Base64.decode64(params[:id]))

		if @survey_ques.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey Questions', data: @survey_ques}, status: :ok
		else

			#logger.error "ERROR: P12MmSurveyC1 Create: #{@survey_ques.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey Questions', data: @survey_ques.errors},
			status: :unprocessable_entity
		end	
	end

	private

	def create_upd_params
		params.permit(	:survey_id,
						:question,
						:answer_type,
						:answer_sub_type,
						:answer_scale,
						:sl_no,
						:question_section_name,
						:mandatory)
	end
end 

require 'base64'
require 'fileutils'

class P12MmSurveyFileuploadInfoController < ApplicationController

	skip_before_action :verify_authenticity_token
 
	def index
	
		if params[:survey_id]
		
			survey_id = Base64.decode64(params[:survey_id])
			
			@file_info = P12MmSurveyFileuploadInfo.where("survey_id = ?", survey_id).order("survey_q_id, id")
		end 

		if params[:survey_q_id]
		
			survey_id = Base64.decode64(params[:survey_q_id])
			
			@file_info = P12MmSurveyFileuploadInfo.where("survey_q_id = ?", survey_id)
		end
		
		if params[:get_fileinfo]
		
			survey_id = Base64.decode64(params[:get_fileinfo])
			
			@file_info = P2TrnFeedbackFileInfo.where(:survey_id=>survey_id)
		end
		
		render json: {status: 'SUCCESS', message: 'List of Survey dateinfo', data: @file_info}, status: :ok
	end

	def show
	
		@file_info = P12MmSurveyFileuploadInfo.find(Base64.decode64(paramsparams[:id]))
		
		render json: {status: 'SUCCESS', message: 'Survey File Details', data: @file_info}, status: :ok
	end

	def create
	
		@file_info = P12MmSurveyFileuploadInfo.new(create_upd_params)
		
		if @file_info.save
		
			render json: {status: 'SUCCESS', message: 'Survey File is uploaded', data: @file_info}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey fileinfo', data: @file_info.errors},
			status: :unprocessable_entity
		end
	end
	
	def batch_create
	
		survey_answer_params['survey_answers'].each do |answers|
		
			@file_info = P12MmSurveyFileuploadInfo.new(answers)
			
			if @file_info.save
			
			else
				render json:{status:'ERROR', message: 'Unable to create Survey fileinfo', data: @file_info.errors}, status: :unprocessable_entity
			end
		end
		
		render json: {status: 'SUCCESS', message: 'Survey fileinfo is added', data: @file_info}, status: :ok
	end

	def update 
	
		@file_info = P12MmSurveyFileuploadInfo.find(params[:id])
		
		if @file_info.update_attributes( create_upd_params)
		
			render json:{status: 'SUCCESS', message: 'Updated Survey fileinfo', data: @file_info}, status: :ok
			
		else
			render json:{status: 'ERROR', message: 'Error while updating Survey fileinfo', data: @file_info.errors}, status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@file_info = P12MmSurveyFileuploadInfo.find(params[:id])
		
		if @file_info.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey fileinfo', data: @file_info}, status: :ok
			
		else
		
			render json:{status: 'ERROR', message: 'Error while deleting Survey fileinfo', data: @file_info.errors}, status: :unprocessable_entity
			
		end	
	end
	
	def upload_file	
		
		feedback_id = params[:feedback_file][:feedback_id]
		
		survey_id = params[:feedback_file][:survey_id]
		
		survey_q_id = params[:feedback_file][:survey_q_id]
		
		file_name = params[:feedback_file][:file_name]	
		
		@survey   = P12MmSurvey.where("id = ?", survey_id)
		
		email_id  = @survey[0]['email_id']
		
		directory = Rails.configuration.file_path + email_id + '/' + survey_id.to_s + '/' +  'feedback_files' + '/' + feedback_id.to_s + '/' + survey_q_id.to_s
		
		FileUtils.mkdir_p directory
		
		data_url 	= params[:feedback_file][:file]
		
		File.open(File.join(directory, file_name), 'wb') do |f|
		
		  f.write(Base64.decode64(data_url))
		  
		end

		@file_feedback = P2TrnFeedbackFileInfo.new		
		@file_feedback.feedback_id = feedback_id
		@file_feedback.survey_id = survey_id
		@file_feedback.survey_q_id = survey_q_id
		@file_feedback.file_path = '/subscriber_files/' +  email_id + '/' + survey_id.to_s + '/' +  'feedback_files' + '/' + feedback_id.to_s + '/' + survey_q_id.to_s + '/' + file_name
		@file_feedback.file_name = file_name
		
		if params[:feedback_file][:file_size].to_i > 1024
		
			csize = 'MB'
			
		else
		
			csize = 'KB'
		end
		
		@file_feedback.file_size = params[:feedback_file][:file_size].to_s + csize
		
		@file_feedback.save
		
		render json:{status: 'SUCCESS', message: 'File Survey created', data: @file_feedback}, status: :ok
	end
	 
	def batch_delete
	
		survey_delete_params['survey_delete'].each do |id|	
		
			@file_info = P12MmSurveyFileuploadInfo.find(id[:id]);
			
			if @file_info.destroy
			
			else
			
				render json:{status: 'ERROR',message: 'Unable to create Survey fileinfo', data: @file_info.errors}, status: :unprocessable_entity
			end
		end
		
		render json: {status: 'SUCCESS', message: 'Survey fileinfo is added', data: @file_info}, status: :ok
	end
 
	private
	
	def create_upd_params
	
		params.permit(	:survey_id, 
						:survey_q_id, 
						:instruction, 
						:pdf, 
						:doc_docx, 
						:png, 
						:jpg_jpeg, 
						:gif, 
						:error_message
					)
	end
	
	def survey_answer_params
	
		params.permit(:survey_answers => [	:survey_id, 
											:survey_q_id, 
											:instruction, 
											:pdf, 
											:doc_docx, 
											:png, 
											:jpg_jpeg, 
											:gif, 
											:error_message
										]
					)
	end	
	
	def survey_delete_params
	
		params.permit( :survey_delete => [:id])
	end	
end
require 'base64'  

class P12MmSurveyController < ApplicationController

	skip_before_action :verify_authenticity_token 

	def index		
		
		if params[:dis_survey_category]
		
			user_email = Base64.decode64(params[:dis_survey_category])
		
			@survey = P12MmSurvey.select("survey_category").where("email_id = ? and status = 'Active' and id not in (select distinct survey_id from p2_trn_feedbacks)", user_email).distinct
		
		end
		
		if params[:analytic_sur_cat]
			
			user_email = Base64.decode64(params[:analytic_sur_cat])
		
			@survey = P12MmSurvey.select("survey_category").where("email_id = ? and status='Shared'", user_email).distinct.order('survey_category')
		
		end
		
		if params[:analytic_survey]
			
			user_email = Base64.decode64(params[:analytic_survey])
		
			@survey = P12MmSurvey.where("email_id = ? and status='Shared'", user_email).order('created_at DESC')
		
		end

		if params[:draft_survey]
		
			user_email = Base64.decode64(params[:draft_survey])
		
			@survey = P12MmSurvey.where("email_id = ? and status = 'Active'", user_email).order('created_at DESC')
			
		end 


		if params[:latest_survey]
		
			user_email = Base64.decode64(params[:latest_survey])
		
			@survey = P12MmSurvey.where("email_id = ? and status = 'Shared' and id in (select survey_id from p2_trn_feedbacks where email_id = ?)", user_email, user_email).maximum('id')
		
		end
		
		if params[:user_survey]
		
			user_email = Base64.decode64(params[:user_survey])
		
			@survey = P12MmSurvey.where("email_id = ?", user_email).order('created_at DESC').limit(5)
		
		end
		
		if params[:search_survey] && params[:search_user]
		
			user_email = Base64.decode64(params[:search_user])
		
			@survey = P12MmSurvey.where("email_id = ? and lower(survey_name) like lower(\'%" + Base64.decode64(params[:search_survey]) + "%\')", user_email).order('created_at DESC').limit(5)
		
		end
		
		
		if params[:get_count]
			
			user_email = Base64.decode64(params[:get_count])
		
			@res_draft = P12MmSurvey.where("email_id = ? and status = 'Active'", user_email).count
			
			if @res_draft <=9
			
				@res_draft = '0' + @res_draft.to_s();
				
			end			
		
			@res_his = P12MmSurvey.where("email_id = ? and status = 'Shared'", user_email).count
			
			if @res_his <=9
			
				@res_his = '0' + @res_his.to_s();
				
			end
			
			@survey = [{ 'draft_count': @res_draft, 'history_count': @res_his }]
		
		end

=begin		
		if params[:latest_survey]
			
			user_email = Base64.decode64(params[:latest_survey])
			
			@survey = ActiveRecord::Base.connection.execute("SELECT p12_mm_surveys(\'" + user_email +  "\')")
		
		end
=end
		render json: {status: 'SUCCESS', message: 'List of Survey', data: @survey}, status: :ok
	end

	def show

		@survey = P12MmSurvey.find(Base64.decode64(params[:id]))

		render json: {status: 'SUCCESS', message: 'Survey Details', data: @survey}, status: :ok
	end

	def create 
		@survey = P12MmSurvey.new(create_params)

		if @survey.save

			render json: {status: 'SUCCESS', message: 'Survey is added', data: @survey}, status: :ok
		else
			render json:{status: 'ERROR', message: 'Unable to create Survey', data: @survey.errors},
			status: :unprocessable_entity
		end
	end

	def update 
		@survey = P12MmSurvey.find(Base64.decode64(params[:id]))

		if @survey.update_attributes( update_params)

			render json:{status: 'SUCCESS', message: 'Updated Survey', data: @survey}, status: :ok
		else

			#logger.error "ERROR: P12MmSurvey Create: #{@survey.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while updating Survey', data: @survey.errors},
			status: :unprocessable_entity
		end
	end
	
	def destroy
	
		@survey = P12MmSurvey.find(Base64.decode64(params[:id]))

		if @survey.destroy
		
			render json:{status: 'SUCCESS', message: 'Deleted Survey', data: @survey}, status: :ok
		else

			#logger.error "ERROR: P12MmSurvey Create: #{@survey.errors.messages.inspect}\n"

			render json:{status: 'ERROR', message: 'Error while deleting Survey', data: @survey.errors},
			status: :unprocessable_entity
		end	
	end 
	
	def file_upload 
	
		email_id 	= params["email_id"]

		survey_id 	= params["survey_id"]
		
		logo_name   = params["logo_name"]
		
		directory   = Rails.configuration.logo_path + email_id + '/' + survey_id.to_s + "/logo"
		
		#directory   = Rails.configuration.logo_path + "/logo"
		
		directory_1 = Rails.configuration.client_logo_path + email_id + '/' + survey_id.to_s + "/logo"
		
		FileUtils.mkdir_p directory

		FileUtils.mkdir_p directory_1
		
		data_url 	= params["file"]
		
		#data_url   = Base64.encode64(params["file"])
		
		#png      	= Base64.decode64(data_url['data:image/png;base64,'.length .. -1])
		
		png      	= Base64.decode64(data_url)
	
		File.open(File.join(directory, logo_name), 'wb') do |f|
		
		  f.write(png)
		  
		end	

		File.open(File.join(directory_1, logo_name), 'wb') do |f|
		
		  f.write(png)
		  
		end	
	end

	private

	def create_params
		params.permit(	:survey_name, 
						:survey_category,
						:logo,
						:logo_name,
						:page_title,
						:description,
						:uid,
						:no_question,
						:email_id,
						:expires_at,
						:display_ques_no)
	end

	def update_params
		params.permit(	:survey_name, 
						:survey_category,
						:logo,
						:logo_name,
						:page_title,
						:description,
						:uid,
						:email_id,
						:status,
						:no_question,
						:expires_at,
						:display_ques_no)
	end
end 

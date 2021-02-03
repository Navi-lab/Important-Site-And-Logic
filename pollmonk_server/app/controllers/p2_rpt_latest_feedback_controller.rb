require 'base64'

class P2RptLatestFeedbackController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index
	
		if params[:get_survey_id]
			
			email_id = Base64.decode64(params[:get_survey_id])			
						
			@report = P2RptLatestFeedback.select("survey_id").where("email_id = ?", email_id).distinct
			
		end
		
		if params[:latest_survey]
			
			user_email = Base64.decode64(params[:latest_survey])
			
			@report = ActiveRecord::Base.connection.execute("SELECT p12_mm_surveys(\'" + user_email +  "\')")
		
		end
		
		if params[:get_report]
			
			sur_id = Base64.decode64(params[:get_report])
			
			@report = P2RptLatestFeedback.where("survey_id = ?", sur_id)
				
		end

		render json: {status: 'SUCCESS', message: 'List of Feedback', data: @report}, status: :ok
	end

end 

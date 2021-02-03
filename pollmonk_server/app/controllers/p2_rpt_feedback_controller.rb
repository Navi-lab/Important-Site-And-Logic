require 'base64'

class P2RptFeedbackController < ApplicationController
 
	skip_before_action :verify_authenticity_token

	def index
	
		if params[:survey_id]
			
			sur_id = Base64.decode64(params[:survey_id])			
						
			@report = P2RptFeedback.all
			
		end
		
		if params[:fun_id]
		
			user_email = Base64.decode64(params[:fun_id])
			
			@survey = ActiveRecord::Base.connection.execute("SELECT p2_rpt_feedbacks(\'" + user_email +  "\')")
		
		end
		
		if params[:get_report]
			
			sur_id = Base64.decode64(params[:get_report])
			
			@report = P2RptFeedback.where("survey_id = ?", sur_id)
				
		end

		render json: {status: 'SUCCESS', message: 'List of Feedback', data: @report}, status: :ok
	end

end 

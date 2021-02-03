require 'base64'
#require 'mime' 

require 'sendgrid-ruby'
include SendGrid

class P2TrnSendMailController < ApplicationController 
	
	skip_before_action :verify_authenticity_token
	
	def send_email	

=begin
		data = ('{
		  "personalizations": [
			{
			  "to": [
				{
				  "email": ' + params[:send_to] + '
				}
			  ],
			  "subject": ' + params[:subject] + '
			}
		  ],
		  "from": {
			"email": "parthibha.t@sunplussoftware.com"
		  },
		  "content": [
			{
			  "type": "text/html",
			  "value": ' + params[:content] + '
			}
		  ]
		}')
		
		logger.debug "SendGrid"
		
		logger.debug data.inspect
=end
		time = Time.now.to_i
		
		mail = SendGrid::Mail.new
		mail.from = Email.new(email: 'info@sunplussoftware.com')
		mail.subject = params[:subject]
		
		personalization = Personalization.new
		personalization.add_to(Email.new(email: params[:send_to], name: ''))
		personalization.send_at = time
		mail.add_personalization(personalization)
		
		mail.add_content(Content.new(type: 'text/html', value: params[:content]))
		
		#logger.debug "SendGrid"
		
		#logger.debug mail.inspect
		
		sg = SendGrid::API.new(api_key: "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")		
		begin
			response = sg.client.mail._("send").post(request_body: mail.to_json)
			
			render json: {status: 'SUCCESS', message: 'Email Sent', data: ""}, status: :ok
			
		rescue Exception => e
			puts e.message
		end
		
	end
	 
	def contact_email	
	
		time = Time.now.to_i
		
		mail = SendGrid::Mail.new
		mail.to = Email.new(email: 'nadia.anjum@sunplussoftware.com')
		mail.subject = params[:subject]
		
		personalization = Personalization.new
		personalization.add_from(Email.new(email: params[:send_to], name: ''))
		personalization.send_at = time
		mail.add_personalization(personalization)
		
		mail.add_content(Content.new(type: 'text/html', value: params[:content]))
		
		#logger.debug "SendGrid"
		
		#logger.debug mail.inspect
		
		sg = SendGrid::API.new(api_key: "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")		
		begin
			response = sg.client.mail._("send").post(request_body: mail.to_json)
			
			render json: {status: 'SUCCESS', message: 'Email Sent', data: ""}, status: :ok
			
		rescue Exception => e
			puts e.message
		end
		
	end
	
end
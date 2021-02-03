class P12MmCreateTempController < ApplicationController 

	skip_before_action :verify_authenticity_token
 
	def multiple_create
		
		@input_data   = main_content_params

		@template     = P12MmTemplate.new(@input_data)
		
		@check_status = false
			
		begin
		
			@template.save
						
			@check_status = true
			
			if @check_status
			
				temp_question_params['temp_questions'].each do |questions|
					
					questions[:template_id] = @template.id
					
					@temp_c1_content = P12MmTemplateC1.new(questions)
					
					begin
					
						@temp_c1_content.save
						
						@check_status = true
						
					rescue => err
						
						@check_status = false
						
						@delete_invoice = @template.destroy
						
						logger.error "ERROR: Create Template: #{err.message}"
					end
				end
			end
			
			if @check_status
			
				temp_answer_params['temp_answers'].each do |answers|		
					
					answers[:template_id]   = @template.template_id

					answers[:template_q_id] = @template.id
					
					@temp_c2_content = P12MmTemplateC2.new(answers)
					
					begin
					
						@temp_c2_content.save
						
						@check_status = true
						
					rescue => err
						
						@check_status = false
						
						@delete_invoice = @template.destroy
						
						logger.error "ERROR: Create Template: #{err.message}"
					end
					
				end
				
			end
						
			if @check_status
					
				render json: {status: 'SUCCESS', data: @template}, status: :ok
				
			else
			
				render json: {status: 'FAILURE'}, status: 404
				
			end		
			
		rescue => err
			
			logger.error "ERROR: Create Template: #{err.message}"
			
			render json: {status: 'FAILURE'}, status: 404
		end
			
	end
	
	
	private
	
	def main_content_params
		params[:temp_main].permit( 	:template_name, 
									:survey_category,
									:description,
									:no_question,
									:no_time_used,
									:time_spent)
		
	end
	
	def temp_question_params
	
		params.permit( :temp_questions => [	:template_id,
											:question,
											:answer_type]) 
			
		
	end
	
	def temp_answer_params
	
		params.permit( :temp_answers => [	:template_id,
											:template_q_id,
											:grade,
											:points])
	
		
	end	
	
end
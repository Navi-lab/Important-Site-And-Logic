class P12MmSurveyTemplateController < ApplicationController 

	skip_before_action :verify_authenticity_token
 
	def batch_create
		
		@check_status = false
		
		temp_question_params['temp_questions'].each do |questions|
		
			#logger.debug questions.inspect
			
			@in_data =  { 
							"survey_id": questions['survey_id'], 
							"question": questions['question'], 
							"answer_type": questions['answer_type']
						}
			
			@temp_c1_content = P12MmSurveyC1.new(@in_data)
			
			@temp_c1_content.save
			
			@check_status = true
			
			@child_data = questions['ques_answer']
			
			logger.debug "answer"
			
			logger.debug questions['ques_answer'].inspect
			
			if @check_status
	
				@child_data.each do |answers|		
					
					answers[:survey_q_id] = @temp_c1_content.id
					
					@temp_c2_content = P12MmSurveyC2.new(answers)
					
					@temp_c2_content.save
					
					@check_status = true
					
				end
				
			end
		end		
					
		if @check_status
				
			render json: {status: 'SUCCESS', data: @template}, status: :ok
			
		else
		
			render json: {status: 'FAILURE'}, status: 404
			
		end	
			
	end	
	
	private
	
	def temp_question_params
	
		params.permit( :temp_questions => [	:survey_id,
											:question,
											:answer_type,
											ques_answer:[	:survey_id,
															:survey_q_id,
															:answer,
															:points]]) 
			
		
	end
	
	def temp_answer_params
	
		params.permit( :temp_answers => [	:survey_id,
											:survey_q_id,
											:answer,
											:points])
	
		
	end	
	
end
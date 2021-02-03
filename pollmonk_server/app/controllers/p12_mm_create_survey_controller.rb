class P12MmCreateSurveyController < ApplicationController 

	skip_before_action :verify_authenticity_token
=begin
	def multiple_create
		
		@input_data   = main_content_params

		@survey       = P12MmSurvey.new(@input_data)
		
		@check_status = false
			
		begin
		
			@survey.save
						
			@check_status = true
			
			if @check_status
			
				sur_question_params['sur_questions'].each do |questions|
				
					logger.debug @survey.id
					
					questions[:survey_id] = @survey.id
					
					@sur_c1_content       = P12MmSurveyC1.new(questions)
					
					begin
					
						@sur_c1_content.save
						
						@check_status = true
						
						if @check_status
							
							if (questions[:answer_type] = 'Multiple Choice' || 
								questions[:answer_type] = 'Checkboxes' || 
								questions[:answer_type] = 'Dropdown')
								
								sur_answer_params['sur_answers'].each do |answers|
								
									logger.debug answers[:sl_no]
									
									logger.debug questions[:sl_no]

									if (answers[:sl_no] = questions[:sl_no])
					
										answers[:survey_id]   = @survey.id

										answers[:survey_q_id] = @sur_c1_content.id
										
										@ans_data = {
													  'survey_id': answers[:survey_id],
													  'survey_q_id': answers[:survey_q_id],
													  'answer': answers[:answer]
													};
										
										@sur_c2_content = P12MmSurveyC2.new(@ans_data)
										
										begin
										
											@sur_c2_content.save
											
											@check_status = true
											
										rescue => err
											
											@check_status = false
											
											@delete_survey = @survey.destroy
											
											logger.error "ERROR: Create multiple choice: #{err.message}"
										end
									end
								end								
								
							end	

							if (questions[:answer_type] = 'Contact Information')
								
								sur_contact_params['sur_contact'].each do |answers|	
									
									if (answers[:sl_no] = questions[:sl_no])
					
										answers[:survey_id]   = @survey.id

										answers[:survey_q_id] = @sur_c1_content.id
										
										@ans_data = {
													   'survey_id': answers[:survey_id],
													   'survey_q_id': answers[:survey_q_id],
													   'contact_info_type': answers[:contact_info_type],
													   'contact_info_label': answers[:contact_info_label]
													}
										
										@sur_c3_content = P12MmSurveyContactInfo.new(@ans_data)
										
										begin
										
											@sur_c3_content.save
											
											@check_status = true
											
										rescue => err
											
											@check_status = false
											
											@delete_survey = @survey.destroy
											
											logger.error "ERROR: Create Contact Information: #{err.message}"
										end
									end
								end								
								
							end
							
							if (questions[:answer_type] = 'Slider')
								
								sur_slider_params['sur_slider'].each do |answers|

									if (answers[:sl_no] = questions[:sl_no])
					
										answers[:survey_id]   = @survey.id

										answers[:survey_q_id] = @sur_c1_content.id
										
										@ans_data = {
													   'survey_id': answers[:survey_id],
													   'survey_q_id': answers[:survey_q_id],
													   'first_value': answers[:first_value],
														'last_value': answers[:last_value]
													}
										
										@sur_c3_content = P12MmSurveySlider.new(@ans_data)
										
										begin
										
											@sur_c3_content.save
											
											@check_status = true
											
										rescue => err
											
											@check_status = false
											
											@delete_survey = @survey.destroy
											
											logger.error "ERROR: Create Slider: #{err.message}"
										end
									end
								end								
								
							end
							
							if (questions[:answer_type] = 'Date / Time')
								
								sur_date_params['sur_date_info'].each do |answers|
									
									if (answers[:sl_no] = questions[:sl_no])
					
										answers[:survey_id]   = @survey.id

										answers[:survey_q_id] = @sur_c1_content.id
										
										@ans_data = {
													'survey_id': answers[:survey_id],
													'survey_q_id': answers[:survey_q_id],
													'display_label': answers[:display_label],
													'date_info': answers[:date_info],
													'time_info': answers[:time_info],
													'error_message': answers[:error_message],
													'date_format': answers[:date_format]
												};
										
										@sur_c3_content = P12MmSurveyDateinfo.new(@ans_data)
										
										begin
										
											@sur_c3_content.save
											
											@check_status = true
											
										rescue => err
											
											@check_status = false
											
											@delete_survey = @survey.destroy
											
											logger.error "ERROR: Create Date / Time: #{err.message}"
										end
									end
								end										
								
							end
							
						end
						
					rescue => err
						
						@check_status = false
						
						@delete_survey = @survey.destroy
						
						logger.error "ERROR: Create Template: #{err.message}"
					end
				end
				
				render json: {status: 'SUCCESS', message: 'Survey Copied', data: @survey}, status: :ok
			end
			
		rescue => err
			
			logger.error "ERROR: Create Survey: #{err.message}"
			
			render json: {status: 'FAILURE'}, status: 404
		end
			
	end
=end

	def multiple_create
		
		@input_data   = main_content_params
		
		logger.debug "#{@input_data}"
		
		@survey       = P12MmSurvey.new(@input_data)
		
		@check_status = false
			
		begin
		
			@survey.save
						
			@check_status = true
			
			if @check_status
			
				sur_question_params['sur_questions'].each do |questions|
				
					#logger.debug @survey.id
					
					questions[:survey_id] = @survey.id
					
					@ques_data = {
		                          'survey_id': questions[:survey_id],
		                          'question': questions[:question],
		                          'answer_type': questions[:answer_type],
                                  'answer_sub_type': questions[:answer_sub_type],
                                  'answer_scale': questions[:answer_scale],
		                          'sl_no': questions[:sl_no],
								  'question_section_name': questions[:question_section_name],
								  'mandatory': questions[:mandatory]
		                        };
					
					@sur_c1_content  = P12MmSurveyC1.new(@ques_data)
					
					logger.debug questions[:question_section_name]
					
					@grp_data = { 
									'survey_id': @survey.id,
									'group_name': questions[:question_section_name]
								}
								
					@sur_group = P12MmSurveyGroupName.new(@grp_data)
					
					begin
					
						@sur_c1_content.save
						
						@check_status = true
						
						if @check_status
							
							if (questions[:answer_type] = 'Multiple Choice' || questions[:answer_type] = 'Checkboxes' || 
								questions[:answer_type] = 'Dropdown' || 
								questions[:answer_type] = 'Multiple Textboxes' || 
								questions[:answer_type] = 'Ranking' || 
								questions[:answer_type] = 'Table')
								
								questions[:sur_ans].each do |answers|
									
									#logger.debug "#{questions[:sur_ans].inspect}"
					
									answers[:survey_id]   = @survey.id

									answers[:survey_q_id] = @sur_c1_content.id
									
									@sur_c2_content = P12MmSurveyC2.new(answers)
									
									begin
									
										@sur_c2_content.save
										
										@check_status = true
										
									rescue => err
										
										@check_status = false
										
										@delete_survey = @survey.destroy
										
										logger.error "ERROR: Create multiple choice failed: #{err.message}"
									end
								end								
								
							end	

							if (questions[:answer_type] = 'Contact Information')
								
								questions[:sur_contact].each do |answers|
								
									#logger.debug "#{questions[:sur_contact].inspect}"
								
									answers[:survey_id]   = @survey.id

									answers[:survey_q_id] = @sur_c1_content.id
									
									@sur_c3_content = P12MmSurveyContactInfo.new(answers)
									
									begin
									
										@sur_c3_content.save
										
										@check_status = true
										
									rescue => err
										
										@check_status = false
										
										@delete_survey = @survey.destroy
										
										logger.error "ERROR: Create Contact Information failed: #{err.message}"
									end
										
								end								
								
							end
							
							if (questions[:answer_type] = 'Slider')
								
								questions[:sur_slider].each do |answers|
									
									#logger.debug "#{questions[:sur_slider].inspect}"
					
									answers[:survey_id]   = @survey.id

									answers[:survey_q_id] = @sur_c1_content.id
									
									@sur_c3_content = P12MmSurveySlider.new(answers)
									
									begin
									
										@sur_c3_content.save
										
										@check_status = true
										
									rescue => err
										
										@check_status = false
										
										@delete_survey = @survey.destroy
										
										logger.error "ERROR: Create Slider failed: #{err.message}"
									end
								end								
								
							end
							
							if (questions[:answer_type] = 'Date / Time')
								
								questions[:sur_date].each do |answers|
									
									#logger.debug "#{questions[:sur_date].inspect}"
					
									answers[:survey_id]   = @survey.id

									answers[:survey_q_id] = @sur_c1_content.id
									
									@sur_c3_content = P12MmSurveyDateinfo.new(answers)
									
									begin
									
										@sur_c3_content.save
										
										@check_status = true
										
									rescue => err
										
										@check_status = false
										
										@delete_survey = @survey.destroy
										
										logger.error "ERROR: Create Date / Time failed: #{err.message}"
									end
								end										
								
							end
							
							if (questions[:answer_type] = 'File Upload')
								
								questions[:sur_file].each do |answers|
									
									#logger.debug "#{questions[:sur_file].inspect}"
					
									answers[:survey_id]   = @survey.id

									answers[:survey_q_id] = @sur_c1_content.id
									
									@sur_c3_content = P12MmSurveyFileuploadInfo.new(answers) 
									
									begin
									
										@sur_c3_content.save
										
										@check_status = true
										
									rescue => err
										
										@check_status = false
										
										@delete_survey = @survey.destroy
										
										logger.error "ERROR: Create File Upload failed: #{err.message}"
									end
								end										
								
							end
							
						end
						
					rescue => err
						
						@check_status = false
						
						@delete_survey = @survey.destroy
						
						logger.error "ERROR: Create Survey Question failed: #{err.message}"
					end
				end
								
				render json: {status: 'SUCCESS', message: 'Survey Copied', data: @survey}, status: :ok
			end
			
		rescue => err
			
			logger.error "ERROR: Create Survey failed: #{err.message}"
			
			render json: {status: 'FAILURE'}, status: 404
		end
			
	end	
	
	private
	
	def main_content_params
		params[:sur_main].permit( 	:survey_name, 
									:survey_category,
									:email_id,
									:expires_at)
		
	end
	
	def sur_question_params
	
		params.permit( :sur_questions => [	:survey_id,
											:question,
											:answer_type,
											:answer_sub_type,
											:answer_scale,
											:sl_no,
											:question_section_name,
											:mandatory,
											:sur_ans => [	:survey_id,
															:survey_q_id,
															:answer],
											:sur_date => [	:survey_id,
															:survey_q_id,
														:display_label,
															
															:date_info,
															:time_info,
															:error_message,
															:date_format],
											:sur_contact => [	:survey_id,
																:survey_q_id,
																:contact_info_type,
																:contact_info_label],
											:sur_slider => [	:survey_id,
																:survey_q_id,
																:first_value,
																:middle_value,
																:last_value],
											
											:sur_file =>   [	:survey_id, 
																:survey_q_id, 
																:instruction, 
																:pdf, 
																:doc_docx, 
																:png, 
																:jpg_jpeg, 
																:gif, 
																:error_message
														    ]
										]) 
			
		
	end
	
	def sur_answer_params
	
		params.permit( :sur_answers => [	:survey_id,
											:survey_q_id,
											:answer,
											:sl_no])
	
		
	end	
	
	def sur_date_params
	
		params.permit( :sur_date_info => [	:survey_id,
											:survey_q_id,
											:display_label,
											:date_info,
											:time_info,
											:error_message,
											:date_format,
											:sl_no])		
	end	
	
	def sur_contact_params
	
		params.permit( :sur_contact => [	:survey_id,
											:survey_q_id,
											:contact_info_type,
											:contact_info_label,
											:sl_no])		
	end	
	
	def sur_slider_params
	
		params.permit( :sur_slider => [		:survey_id,
											:survey_q_id,
											:first_value,
											:middle_value,
											:last_value,
											:sl_no])		
	end	
	
end
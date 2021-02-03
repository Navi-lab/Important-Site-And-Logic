require 'base64'

class P12MmGetSurveyController < ApplicationController 

	skip_before_action :verify_authenticity_token
	
	def get_survey_details
	
		survey_id    = Base64.decode64(params[:survey_id])
		
		@survey      = P12MmSurvey.where("id = ?", survey_id)
		
		@survey_ques = P12MmSurveyC1.where("survey_id = ?", survey_id).order('sl_no')
		
		@survey_ans  = P12MmSurveyC2.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@result      = { 
							'survey_main': @survey,
							'survey_ques': @survey_ques,
							'survey_ans': @survey_ans
							
						}
		
		render json: {status: 'SUCCESS', message: 'List of Survey Details', data: @result}, status: :ok
		
	end
	
	def get_db_sur_res
	
		survey_id    = Base64.decode64(params[:survey_id])
		
		@survey      = P12MmSurvey.where("id = ?", survey_id)
		
		@survey_ques = P12MmSurveyC1.where("survey_id = ?", survey_id).order('sl_no')
		
		@survey_ans  = P12MmSurveyC2.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_res  = P2RptLatestFeedback.where("survey_id = ?", survey_id)
		
		@survey_fbc  = P2TrnFeedback.where("survey_id = ?", survey_id).count
		
		if @survey_fbc <=9
			
			@survey_fbc = '0' + @survey_fbc.to_s();
			
		end	
		
		@result      = { 
							'survey_main': @survey,
							'survey_ques': @survey_ques,
							'survey_ans': @survey_ans,
							'survey_res': @survey_res,
							'survey_fbc': @survey_fbc
							
						}
		
		render json: {status: 'SUCCESS', message: 'List of Survey Details', data: @result}, status: :ok
		
	end
	
	def get_survey_res
	
		survey_id    = Base64.decode64(params[:survey_id])
		
		@generate_res = ActiveRecord::Base.connection.execute("SELECT p2_rpt_feedbacks(\'" + survey_id.to_s +  "\')")
		
		@survey      = P12MmSurvey.where("id = ?", survey_id)
		
		@survey_grp  = P12MmSurveyGroupName.select('group_name as question_section_name').where("group_name in (select distinct question_section_name from p12_mm_survey_c1s where survey_id = ?) and survey_id = ?", survey_id, survey_id).order('id')
		
		@survey_ques = P12MmSurveyC1.where("survey_id = ?", survey_id).order('sl_no')
		
		@survey_ans  = P12MmSurveyC2.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_contact = P12MmSurveyContactInfo.joins(:p2_trn_feedback_contact_info).select("p12_mm_survey_contact_infos.contact_info_label, p2_trn_feedback_contact_infos.contact_info_value, p2_trn_feedback_contact_infos.survey_id,
		p2_trn_feedback_contact_infos.survey_q_id").where("p12_mm_survey_contact_infos.survey_id = ?", survey_id)
		
		@survey_contact_lbl = P12MmSurveyContactInfo.where("survey_id = ?", survey_id).order("id")
		
		@survey_slider = P12MmSurveySlider.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_res  = P2RptFeedback.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_xdata = P2TrnFeedbackC1.where("survey_q_id in (select id from p12_mm_survey_c1s where answer_type = 'Multiple Textboxes' and survey_id = ?)", survey_id).order("survey_q_id, id")
		
		@survey_file = P2TrnFeedbackFileInfo.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_console  = P2RptFeedbackTb.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@result      = { 
							'survey_main': @survey,
							'survey_grp': @survey_grp,
							'survey_ques': @survey_ques,
							'survey_ans': @survey_ans,
							'survey_contact': @survey_contact,
							'survey_contact_lbl': @survey_contact_lbl,
							'survey_slider': @survey_slider,
							'survey_res': @survey_res,
							'survey_file': @survey_file,
							'survey_console': @survey_console,
							'survey_xdata': @survey_xdata
						}
		
		render json: {status: 'SUCCESS', message: 'List of Survey Details', data: @result}, status: :ok
		
	end
	
	def get_survey_preview
	
		survey_id    = Base64.decode64(params[:survey_id])
		
		@survey      = P12MmSurvey.where("id = ?", survey_id)
		
		#@survey_grp  = P12MmSurveyC1.select('question_section_name').where("survey_id = ?", survey_id).distinct
		
		@survey_grp  = P12MmSurveyGroupName.select('group_name as question_section_name').where("group_name in (select distinct question_section_name from p12_mm_survey_c1s where survey_id = ?) and survey_id = ?", survey_id, survey_id).order('id')
		
		@survey_ques = P12MmSurveyC1.where("survey_id = ?", survey_id).order('sl_no')
		
		@survey_ans  = P12MmSurveyC2.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_contact = P12MmSurveyContactInfo.where("survey_id = ?", survey_id).order('id')
		
		@survey_slider = P12MmSurveySlider.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_date = P12MmSurveyDateinfo.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_file = P12MmSurveyFileuploadInfo.where("survey_id = ?", survey_id).order("survey_q_id, id")
		
		@survey_mat_col_scale = P12MmSurveyMatrix.where("survey_id = ? and matrix_type = 'column'", survey_id).order("survey_q_id, id")
		
		@survey_mat_row_scale = P12MmSurveyMatrix.where("survey_id = ? and matrix_type = 'row'", survey_id).order("survey_q_id, id")
		
		@result      = { 
							'survey_main': @survey,
							'survey_grp': @survey_grp,
							'survey_ques': @survey_ques,
							'survey_ans': @survey_ans,
							'survey_contact': @survey_contact,
							'survey_slider': @survey_slider,
							'survey_date': @survey_date,
							'survey_file': @survey_file,
							'survey_mat_col_scale': @survey_mat_col_scale,
							'survey_mat_row_scale': @survey_mat_row_scale
						}
		
		render json: {status: 'SUCCESS', message: 'List of Survey Details', data: @result}, status: :ok
		
	end
	
	def get_templates
		
		@template_cat = P12MmTemplate.select("survey_category").distinct.order('survey_category')
		
		@template     = P12MmTemplate.all		
		
		@result      = { 
							'template_cat': @template_cat,
							'template': @template
							
						}
		
		render json: {status: 'SUCCESS', message: 'List of Template Details', data: @result}, status: :ok
		
	end
	
	def get_template_details
	
		template_id    = Base64.decode64(params[:template_id])
		
		#@template      = P12MmTemplate.where("id = ?", template_id)
		
		@template_ques = P12MmTemplateC1.where("template_id = ?", template_id).order('id')
		
		@template_ans  = P12MmTemplateC2.where("template_id = ?", template_id).order("template_q_id, id")
		
		@result      = { 
							'template_ques': @template_ques,
							'template_ans': @template_ans
							
						}
		
		render json: {status: 'SUCCESS', message: 'List of Survey Details', data: @result}, status: :ok
		
	end
	
	def get_feedback_info
		
		email_id    = Base64.decode64(params[:email])
	
		survey_id   = Base64.decode64(params[:survey_id])
	
		@email_info = P2TrnEmailInfo.where("send_to = ? and survey_id = ?", email_id, survey_id)
				
		if @email_info.length >= 1
			
			@feedback = P2TrnFeedback.where("user_info = ? and survey_id = ?", email_id, survey_id)
			
			if @feedback.length >= 1
			
				render json: {status: 'SUCCESS', message: 'List of Survey Details', data: 'Feedback is already given'}, status: :ok
				
			else
		
				render json: {status: 'SUCCESS', message: 'List of Survey Details', data: '.'}, status: :ok	
					
			end
		
		else
		
			render json: {status: 'SUCCESS', message: 'List of Survey Details', data: 'Invalid User'}, status: :ok	
				
		end
	
	end
	
end 

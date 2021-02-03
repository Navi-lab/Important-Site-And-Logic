Rails.application.routes.draw do
	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	
	devise_for  :users, sign_out_via: [:get, :delete],
			    controllers: {
						sessions: 'users/sessions', registrations: 'users/registrations'
				}
	
	root 'home#index'
	get  'confirm/index'
	get  'confirm/edit'
	get  'confirm/create' 
	get  '/check_email', to: 'confirm#emailcheck'
	get  '/checkemail', to: 'confirm#checkforgot'

	resources :p99_get_user do
		match :get_user_details, via: [:get],  on: :collection
		match :get_user_info, via: [:get],  on: :collection

	end 

	resources 	:p12_mm_survey,
				:p12_mm_survey_c1,
				:p12_mm_survey_c2,
				:p1_conf_sur_category,
				:p1_conf_sur_ans_type,
				:p1_conf_ques_limit,
				:p2_trn_feedback,
				:p2_trn_feedback_c1,
				:p2_trn_session_time,
				:p12_mm_template,
				:p12_mm_template_c1,
				:p12_mm_template_c2,
				:p1_conf_ans_scale,
				:p1_conf_answer,
				:p2_rpt_feedback,
				:p2_trn_email_info,
				:p2_trn_feedback_contact_info,
				:p12_mm_survey_slider,
				:p12_mm_survey_contact_info,
				:p1_conf_contact_info,
				:p12_mm_email_list,
				:p2_rpt_latest_feedback,
				:p12_mm_survey_dateinfo,
				:p12_mm_survey_fileupload_info,
				:p12_mm_survey_matrix,
				:p2_trn_feedback_matrix,
				:p12_mm_survey_group_name

				post "file_upload", to: 'p12_mm_survey#file_upload'
				post "upload_file", to: 'p12_mm_survey_fileupload_info#upload_file'

	resources :p99_dump_data do
		match :insert_data, via: [:get],  on: :collection

	end

	resources :p2_trn_send_mail do
		match :send_email, via: [:post],  on: :collection
		match :contact_email, via: [:post],  on: :collection

	end

	resources :p12_mm_survey_c2 do
		match :batch_create, via: [:post],  on: :collection
		match :batch_delete, via: [:post],  on: :collection

	end 
	
	resources :p12_mm_survey_fileupload_info do
		match :batch_create, via: [:post],  on: :collection
		match :batch_delete, via: [:post],  on: :collection

	end 

	resources :p12_mm_template_c2 do
		match :batch_create, via: [:post],  on: :collection

	end 

	resources :p12_mm_survey_slider do
		match :batch_create, via: [:post],  on: :collection
		match :batch_delete, via: [:post],  on: :collection

	end 

	resources :p12_mm_survey_dateinfo do
		match :batch_create, via: [:post],  on: :collection
		match :batch_delete, via: [:post],  on: :collection

	end 
	
	resources :p12_mm_survey_matrix do
		match :batch_create, via: [:post],  on: :collection
		match :batch_delete, via: [:post],  on: :collection

	end 

	resources :p2_trn_feedback_c1 do
		match :batch_create, via: [:post],  on: :collection

	end 

	resources :p2_trn_feedback_contact_info do
		match :batch_create, via: [:post],  on: :collection

	end  
	
	resources :p2_trn_feedback_matrix do
		match :batch_create, via: [:post],  on: :collection

	end  

	resources :p12_mm_survey_contact_info do
		match :batch_create, via: [:post],  on: :collection
		match :batch_delete, via: [:post],  on: :collection
	end 

	resources :p12_mm_survey_template do
		match :batch_create, via: [:post],  on: :collection

	end 

	resources :p12_mm_email_list do
		match :batch_create, via: [:post],  on: :collection

	end 

	resources :p12_get_location do
		match :get_location, via: [:get],  on: :collection
		match :get_device_info, via: [:get],  on: :collection
		match :get_mac_address, via: [:get],  on: :collection
	end

	resources :p12_mm_create_temp do
		match :multiple_create, via: [:post],  on: :collection

	end 
	
	resources :p12_mm_create_survey do
		match :multiple_create, via: [:post],  on: :collection

	end 
	
	resources :p12_mm_get_survey do
		match :get_survey_details, via: [:get],  on: :collection
		match :get_db_sur_res, via: [:get],  on: :collection
		match :get_survey_res, via: [:get],  on: :collection
		match :get_survey_preview, via: [:get],  on: :collection
		match :get_template_details, via: [:get],  on: :collection 
		match :get_templates, via: [:get],  on: :collection
		match :get_feedback_info, via: [:get],  on: :collection
				
	end 
end

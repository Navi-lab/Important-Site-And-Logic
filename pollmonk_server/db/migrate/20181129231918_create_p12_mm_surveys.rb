class CreateP12MmSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_surveys do |t|
		t.string  :survey_name, :limit => 10000
		t.string  :survey_category
		t.string  :logo
		t.string  :logo_name
		t.string  :page_title, :limit => 10000
		t.datetime :expires_at
		t.string  :description, :limit => 10000
		t.string  :no_question, :default => '0'
		t.string  :no_time_used
		t.string  :time_spent
		t.string  :progress_bar
		t.string  :one_ques_at_time
		t.string  :display_ques_no
		t.string  :welcome_text, :limit => 10000
		t.string  :thank_you_text, :limit => 10000
		t.string  :language
		t.string  :version
		t.string  :uid
		t.string  :email_id
		t.string  :status, :default => 'Active'
		t.timestamps
    end
	
	execute <<-SQL
		
		-- FUNCTION: public.p12_mm_surveys(character varying)

		-- DROP FUNCTION public.p12_mm_surveys(character varying);

		CREATE OR REPLACE FUNCTION public.p12_mm_surveys(
			par_user character varying)
			RETURNS character varying
			LANGUAGE 'plpgsql'

			COST 100
			VOLATILE 
		AS $BODY$

			declare

			var_id	 		integer;
			var_sur_title	character varying;
			var_res  		character varying;
			var_cid	 		integer; 
			var_gid			integer; 
			var_ques 		character varying;
			var_ans	 		character varying;
			var_ans_type	character varying;
			var_sur_ans		character varying;
			var_ans_scale   character varying;
			var_ans_val 	integer;
			var_first_value	integer;
			var_last_value	integer;
			var_inc_value	integer;
			
			cur_sur_ques refcursor;
			cur_sur_ans  refcursor;
			cur_fed_ans  refcursor;
			cur_sld_ans  refcursor;

			begin
			
				delete from p2_rpt_latest_feedbacks where email_id  = par_user;
			
				select max(survey_id)
				into   var_id
				from   p12_mm_survey_c1s
				where  answer_type not in ('Comment Box', 'Single Textbox', 'Date / Time', 'Contact Information', 'Slider')
				and    survey_id in (	select 	id 
										from   	p12_mm_surveys 
										where 	email_id  = par_user
										and 	status 	  = 'Shared'
										and 	id 	in	(	select 	survey_id 
															from 	p2_trn_feedbacks 
															where 	email_id = par_user));
				
				
				select 	survey_name
				into 	var_sur_title  
				from   	p12_mm_surveys 
				where 	id  =  var_id;
				
				
				if var_id is null then
				
					var_res = 'No Recent Survey';
					
				else
				
					open cur_sur_ques for 	select	id, question, answer_type, answer_scale
											from	p12_mm_survey_c1s
											where	survey_id = var_id;
					loop
						
						fetch cur_sur_ques into var_cid, var_ques, var_ans_type, var_ans_scale;
						exit when not found;
						
						if(	var_ans_type = 'Multiple Choice' or
							var_ans_type = 'Checkboxes' or
							var_ans_type = 'Dropdown') then
						
							open cur_sur_ans for 	select	id, answer
													from	p12_mm_survey_c2s
													where	survey_id 	= var_id
													and 	survey_q_id = var_cid;
													
							loop
							
								fetch cur_sur_ans into var_gid, var_sur_ans;
								exit when not found;					
								
								select count(survey_answer) 	into 	var_ans 	
																from 	p2_trn_feedback_c1s
																where	survey_id = var_id
																and 	survey_q_id 	= var_cid
																and 	survey_grade_id = var_gid;
																
								if var_ans is null then
								
									var_ans = 0;
									
								end if;
								
								insert into p2_rpt_latest_feedbacks (	survey_id,
																		survey_title,
																		survey_q_id,
																		survey_question,
																		survey_ques_type,
																		survey_grade_id,
																		survey_answer,
																		feedback_answer,
																		created_at,
																		updated_at,
																		email_id
																	)
															values  (	var_id,
																		var_sur_title,
																		var_cid,
																		var_ques, 
																		var_ans_type,
																		var_gid,
																		var_sur_ans,
																		var_ans,
																		now()::timestamp,
																		now()::timestamp,
																		par_user);		
						
							end loop;
						
							close cur_sur_ans;
							
						end if;
						
						if  (var_ans_type = 'Star Rating') then
							
							for i in 1..var_ans_scale::integer LOOP
								
								insert into p2_rpt_latest_feedbacks (	survey_id,
																		survey_title,
																		survey_q_id,
																		survey_question,
																		survey_ques_type,
																		survey_grade_id,
																		survey_answer,
																		feedback_answer,
																		created_at,
																		updated_at,
																		email_id
																	)
															values  (	var_id,
																		var_sur_title,
																		var_cid,
																		var_ques, 
																		var_ans_type,
																		var_gid,
																		i,
																		0,
																		now()::timestamp,
																		now()::timestamp,
																		par_user);	
							end loop;
									
							open cur_fed_ans for 	select  distinct survey_answer	
													from 	p2_trn_feedback_c1s
													where	survey_id 		= var_id
													and 	survey_q_id 	= var_cid;
													
							loop
							
								fetch cur_fed_ans into var_ans;
								exit when not found;		
									
								select count(survey_answer) 	into 	var_ans_val 	
																from 	p2_trn_feedback_c1s
																where	survey_id 	= var_id
																and 	survey_q_id = var_cid
																and 	survey_answer = var_ans;
									
								update 	p2_rpt_latest_feedbacks 
								set 	feedback_answer = var_ans_val
								where	survey_id 		= var_id::character varying
								and 	survey_q_id 	= var_cid::character varying
								and		survey_answer   = var_ans;				
																
							end loop;
						
							close cur_fed_ans;
							
						end if;
						
						if  (var_ans_type = 'Slider') then
						
							open cur_sld_ans for 	select  first_value, last_value	
													from 	p12_mm_survey_sliders
													where	survey_id 		= var_id
													and 	survey_q_id 	= var_cid;
							loop
							
								fetch cur_sld_ans into var_first_value, var_last_value;
								exit when not found;
								
								var_inc_value = (var_ans_scale::integer - 1);
								
								for i in var_first_value..var_last_value by var_ans_scale::integer loop
													
									insert into p2_rpt_latest_feedbacks (	survey_id,
																			survey_title,
																			survey_q_id,
																			survey_question,
																			survey_ques_type,
																			survey_grade_id,
																			survey_answer,
																			feedback_answer,
																			created_at,
																			updated_at,
																			email_id
																		)
																values  (	var_id,
																			var_sur_title,
																			var_cid,
																			var_ques, 
																			var_ans_type,
																			var_gid,
																			i,
																			0,
																			now()::timestamp,
																			now()::timestamp,
																		par_user);	
								end loop;
									
								open cur_fed_ans for 	select  survey_answer	
														from 	p2_trn_feedback_c1s
														where	survey_id 		= var_id
														and 	survey_q_id 	= var_cid;
														
								loop
								
									fetch cur_fed_ans into var_ans;
									exit when not found;					
										
									select count(survey_answer) 	into 	var_ans_val 	
																	from 	p2_trn_feedback_c1s
																	where	survey_id 	= var_id
																	and 	survey_q_id = var_cid
																	and 	survey_answer = var_ans;
										
									update 	p2_rpt_latest_feedbacks 
									set 	feedback_answer = var_ans_val
									where	survey_id 		= var_id::character varying
									and 	survey_q_id 	= var_cid::character varying
									and		survey_answer   = var_ans;				
																	
								end loop;
							
								close cur_fed_ans;
								
							end loop;
							
							close cur_sld_ans;
							
						end if;
					
					end loop;
					
					close cur_sur_ques;			
					
				end if;

			return var_res;
			end		

		$BODY$;

		ALTER FUNCTION public.p12_mm_surveys(character varying)
			OWNER TO postgres;

	
	
	SQL
	
  end
end

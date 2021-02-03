class CreateP2RptFeedbacks < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_rpt_feedbacks do |t|
		t.string  :survey_id
		t.string  :survey_title
		t.string  :survey_q_id
		t.string  :survey_question
		t.string  :survey_ques_type
		t.string  :survey_grade_id
		t.string  :survey_answer
		t.string  :feedback_answer
		t.string  :feedback_cid
		
		t.timestamps
    end
	
	-- FUNCTION: public.p2_rpt_feedbacks(character varying)

-- DROP FUNCTION public.p2_rpt_feedbacks(character varying);

CREATE OR REPLACE FUNCTION public.p2_rpt_feedbacks(
	par_survey_id character varying)
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
	var_sur_ans 	character varying;
	var_ans	 		character varying;
	var_ans_type	character varying;
	var_ans_scale   character varying;
	var_ans_val 	integer;
	var_first_value	integer;
	var_last_value	integer;
	var_inc_value	integer;
	var_dt_format   character varying;
	var_fcid        character varying;
	var_count   	integer;
	var_rid			integer;
	var_row_val		character varying;
	var_clid		integer;
	var_col_val		character varying;
	var_x_set		character varying;
	var_y_set		character varying;
	var_ans_set		character varying;
	var_time_info 	character varying;
	
	cur_sur_ques 	refcursor;
	cur_sur_ans  	refcursor;
	cur_fed_ans  	refcursor;
	cur_sld_ans  	refcursor;
	cur_row_data 	refcursor;
	cur_col_data 	refcursor;

	begin	
	
		delete from p2_rpt_feedbacks where survey_id = par_survey_id;
		
		delete from p2_rpt_feedback_tbs where survey_id = par_survey_id;
		
		open cur_sur_ques for 	select	id, question, answer_type, answer_scale
								from	p12_mm_survey_c1s
								where	survey_id = par_survey_id::integer;
		loop
			
			fetch cur_sur_ques into var_cid, var_ques, var_ans_type, var_ans_scale;
			exit when not found;
			
			var_count = 0;
			
			if(var_ans_type = 'Multiple Choice' or
				var_ans_type = 'Checkboxes' or
				var_ans_type = 'Dropdown') then
				
				var_x_set = '';
				var_y_set = '';
				
				open cur_sur_ans for 	select	id, answer
										from	p12_mm_survey_c2s
										where	survey_id 	= par_survey_id::integer
										and 	survey_q_id = var_cid;
										
				loop
				
					fetch cur_sur_ans into var_gid, var_sur_ans;
					exit when not found;					
					
					select count(survey_answer) 	into 	var_ans 	
													from 	p2_trn_feedback_c1s
													where	survey_id 		= par_survey_id::integer
													and 	survey_q_id 	= var_cid
													and 	survey_grade_id = var_gid;
													
					if var_ans is null then
					
						var_ans = 0;
						
					end if;
					
					if var_x_set != '' then
						
						var_x_set  = var_x_set ||  ', '  ||  var_ans::character varying;
						
					else
					
					   var_x_set = var_ans;
					   
					end if;
					
					if var_y_set != '' then
						
						var_y_set  = var_y_set ||  ', '  ||  var_sur_ans::character varying;
						
					else
					
					   var_y_set = var_sur_ans;
					   
					end if;
					
					insert into p2_rpt_feedbacks (	survey_id,
													survey_title,
													survey_q_id,
													survey_question,
													survey_ques_type,
													survey_grade_id,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at
												)
										values  (	par_survey_id,
													var_sur_title,
													var_cid,
													var_ques, 
													var_ans_type,
													var_gid,
													var_sur_ans,
													var_ans,
													now()::timestamp,
													now()::timestamp);				
					
			
				end loop;
			
				close cur_sur_ans;	
				
				insert into p2_rpt_feedback_tbs (	survey_id,
													survey_q_id,
													feedback_cid,
													survey_grade_id,
													survey_ans_id,
													survey_question,
													survey_ques_type,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at
												)
										values  (	par_survey_id,
													var_cid,
													var_fcid,
													var_gid,
													'',
													var_ques, 
													var_ans_type,
													var_y_set,
													var_x_set,
													now()::timestamp,
													now()::timestamp);	
				
			end if;

			if(var_ans_type = 'Single Textbox' or 
			   var_ans_type = 'Comment Box'  or 
			   var_ans_type = 'Table') then

				open cur_fed_ans for 	select  survey_answer, survey_grade_id 	
										from 	p2_trn_feedback_c1s
										where	survey_id 		= par_survey_id::integer
										and 	survey_q_id 	= var_cid;
										
				loop
				
					fetch cur_fed_ans into var_ans, var_gid;
					exit when not found;
					
					insert into p2_rpt_feedbacks (	survey_id,
													survey_title,
													survey_q_id,
													survey_question,
													survey_ques_type,
													survey_grade_id,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at
													)
											values  (	par_survey_id,
														var_sur_title,
														var_cid,
														var_ques, 
														var_ans_type,
														var_gid,
														'-',
														var_ans,
														now()::timestamp,
														now()::timestamp);					
				end loop;
			
				close cur_fed_ans;		
				
			end if;
			
			if(var_ans_type = 'Date / Time') then
						
				open cur_fed_ans for 	select  id, survey_answer	
										from 	p2_trn_feedback_c1s
										where	survey_id 		= par_survey_id::integer
										and 	survey_q_id 	= var_cid;
										
				loop
				
					fetch cur_fed_ans into var_fcid, var_ans;
					exit when not found;
					
					select  date_format, time_info
					into 	var_dt_format, var_time_info
					from 	p12_mm_survey_dateinfos
					where	survey_id 		= par_survey_id::integer
					and 	survey_q_id 	= var_cid; 
					
					insert into p2_rpt_feedbacks (	survey_id,
													survey_title,
													survey_q_id,
													survey_question,
													survey_ques_type,
													survey_grade_id,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at,
													feedback_cid
													)
										values  (	par_survey_id,
													var_sur_title,
													var_cid,
													var_ques, 
													var_ans_type,
													var_gid,
													var_dt_format || ':' || var_time_info,
													var_ans,
													now()::timestamp,
													now()::timestamp,
													var_fcid);					
				end loop;
			
				close cur_fed_ans;		
				
			end if;
			
			if(var_ans_type = 'Multiple Textboxes') then
			
				open cur_sur_ans for 	select	id, answer
										from	p12_mm_survey_c2s
										where	survey_id 	= par_survey_id::integer
										and 	survey_q_id = var_cid;
										
				loop
				
					fetch cur_sur_ans into var_gid, var_sur_ans;
					exit when not found;					
					
					open cur_fed_ans for 	select  id, survey_answer	
											from 	p2_trn_feedback_c1s
											where	survey_id 		= par_survey_id::integer
											and 	survey_q_id 	= var_cid
											and		survey_grade_id = var_gid;
										
					loop
				
					fetch cur_fed_ans into var_fcid, var_ans;
					exit when not found;
					
					insert into p2_rpt_feedbacks (	survey_id,
													survey_title,
													survey_q_id,
													survey_question,
													survey_ques_type,
													survey_grade_id,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at,
													feedback_cid
												)
										values  (	par_survey_id,
													var_sur_title,
													var_cid,
													var_ques, 
													var_ans_type,
													var_gid,
													var_sur_ans,
													var_ans,
													now()::timestamp,
													now()::timestamp,
													var_fcid);		
					end loop;
			
					close cur_fed_ans;
			
				end loop;
			
				close cur_sur_ans;					
				
			end if;
			
			if(var_ans_type = 'Star Rating') then
			
				var_x_set = '';
				var_y_set = '';
					
				for i in 1..var_ans_scale::integer LOOP
				
					if var_y_set != '' then
						
						var_y_set  = var_y_set ||  ', '  ||  i::character varying;
						
					else
					
					   var_y_set = i;
					   
					end if;
					
					insert into p2_rpt_feedbacks (	survey_id,
													survey_title,
													survey_q_id,
													survey_question,
													survey_ques_type,
													survey_grade_id,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at
												)
										values  (	par_survey_id,
													var_sur_title,
													var_cid,
													var_ques, 
													var_ans_type,
													var_gid,
													i,
													0,
													now()::timestamp,
													now()::timestamp);	
				end loop;
						
				open cur_fed_ans for 	select  distinct survey_answer	
										from 	p2_trn_feedback_c1s
										where	survey_id 		= par_survey_id::integer
										and 	survey_q_id 	= var_cid;
										
				loop
				
					fetch cur_fed_ans into var_ans;
					exit when not found;

					if var_ans is null then
					
						var_ans = 0;
						
					end if;						
					
						
					select count(survey_answer) 	into 	var_ans_val 	
													from 	p2_trn_feedback_c1s
													where	survey_id 	= par_survey_id::integer
													and 	survey_q_id = var_cid
													and 	survey_answer = var_ans;

					if var_x_set != '' then
						
						var_x_set  = var_x_set ||  ', '  ||  var_ans_val::character varying;
						
					else
					
					   var_x_set = var_ans_val;
					   
					end if;
						
					update p2_rpt_feedbacks set 	feedback_answer = var_ans_val
											where	survey_id 		= par_survey_id
											and 	survey_q_id 	= var_cid::character varying
											and		survey_answer   = var_ans;				
													
				end loop;
			
				close cur_fed_ans;
				
				insert into p2_rpt_feedback_tbs (	survey_id,
													survey_q_id,
													feedback_cid,
													survey_grade_id,
													survey_ans_id,
													survey_question,
													survey_ques_type,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at
												)
										values  (	par_survey_id,
													var_cid,
													var_fcid,
													var_gid,
													'',
													var_ques, 
													var_ans_type,
													var_y_set,
													var_x_set,
													now()::timestamp,
													now()::timestamp);	
				
			end if;
			
			if(var_ans_type = 'Slider') then

				var_x_set = '';
				var_y_set = '';
			
				open cur_sld_ans for 	select  first_value, last_value	
										from 	p12_mm_survey_sliders
										where	survey_id 		= par_survey_id::integer
										and 	survey_q_id 	= var_cid;
				loop
				
					fetch cur_sld_ans into var_first_value, var_last_value;
					exit when not found;
					
					var_inc_value = (var_ans_scale::integer - 1);
					
					for i in var_first_value..var_last_value by var_ans_scale::integer loop

						if var_y_set != '' then
						
							var_y_set  = var_y_set ||  ', '  ||  i::character varying;
							
						else
						
						   var_y_set = i;
						   
						end if;

						select count(survey_answer) 	into 	var_ans_val 	
														from 	p2_trn_feedback_c1s
														where	survey_id 	= par_survey_id::integer
														and 	survey_q_id = var_cid
														and 	survey_answer = i::character varying;

						if var_ans_val is null then
					
							var_ans_val = 0;
							
						end if;

						if var_x_set != '' then
						
							var_x_set  = var_x_set ||  ', '  ||  var_ans_val::character varying;
							
						else
						
						   var_x_set = var_ans_val;
						   
						end if;
										
						insert into p2_rpt_feedbacks (	survey_id,
														survey_title,
														survey_q_id,
														survey_question,
														survey_ques_type,
														survey_grade_id,
														survey_answer,
														feedback_answer,
														created_at,
														updated_at
													)
											values  (	par_survey_id,
														var_sur_title,
														var_cid,
														var_ques, 
														var_ans_type,
														var_gid,
														i,
														var_ans_val,
														now()::timestamp,
														now()::timestamp);	
					end loop;
						
					/*open cur_fed_ans for 	select  survey_answer	
											from 	p2_trn_feedback_c1s
											where	survey_id 		= par_survey_id::integer
											and 	survey_q_id 	= var_cid;
											
					loop
					
						fetch cur_fed_ans into var_ans;
						exit when not found;					
							
						select count(survey_answer) 	into 	var_ans_val 	
														from 	p2_trn_feedback_c1s
														where	survey_id 	= par_survey_id::integer
														and 	survey_q_id = var_cid
														and 	survey_answer = var_ans;

						if var_x_set != '' then
						
							var_x_set  = var_x_set ||  ', '  ||  var_ans_val::character varying;
							
						else
						
						   var_x_set = var_ans_val;
						   
						end if;	
							
						update p2_rpt_feedbacks set 	feedback_answer = var_ans_val
												where	survey_id 		= par_survey_id
												and 	survey_q_id 	= var_cid::character varying
												and		survey_answer   = var_ans;				
														
					end loop;
				
					close cur_fed_ans;*/

					insert into p2_rpt_feedback_tbs (	survey_id,
														survey_q_id,
														feedback_cid,
														survey_grade_id,
														survey_ans_id,
														survey_question,
														survey_ques_type,
														survey_answer,
														feedback_answer,
														created_at,
														updated_at
													)
											values  (	par_survey_id,
														var_cid,
														var_fcid,
														var_gid,
														'',
														var_ques, 
														var_ans_type,
														var_y_set,
														var_x_set,
														now()::timestamp,
														now()::timestamp);
					
				end loop;
				
				close cur_sld_ans;
				
			end if;
			
			if(var_ans_type = 'Ranking') then	

				var_x_set   = '';
				var_y_set   = '';
				var_ans_set = '';		
								
				open cur_sur_ans for 	select	id, answer
										from	p12_mm_survey_c2s
										where	survey_id 	= par_survey_id::integer
										and 	survey_q_id = var_cid;
										
				loop
				
					fetch cur_sur_ans into var_gid, var_sur_ans;
					exit when not found;

					if var_y_set != '' then
						
						var_y_set  = var_y_set ||  ', '  ||  var_sur_ans::character varying;
						
					else
					
					   var_y_set = var_sur_ans;
					   
					end if;
					
					select	count(answer) 
					into 	var_count
					from	p12_mm_survey_c2s
					where	survey_id 	= par_survey_id::integer
					and 	survey_q_id = var_cid;

					--var_count = var_count + 1;

					var_ans_set = '';				
					
					for i in 1..var_count loop
					
						select 	count(survey_answer) 	
						into 	var_ans 	
						from 	p2_trn_feedback_c1s
						where	survey_id 		= par_survey_id::integer
						and 	survey_q_id 	= var_cid
						and 	survey_grade_id = var_gid
						and     survey_answer   = (i)::character varying;
													
						if var_ans is null then
						
							var_ans = 0;
							
						end if;

						if var_ans_set != '' then
						
							var_ans_set  = var_ans_set::integer +  var_ans::integer;
							
						else
						
						   var_ans_set = var_ans;
						   
						end if;	
										
						insert into p2_rpt_feedbacks (	survey_id,
														survey_title,
														survey_q_id,
														survey_question,
														survey_ques_type,
														survey_grade_id,
														survey_answer,
														feedback_answer,
														created_at,
														updated_at
													)
											values  (	par_survey_id,
														(i),
														var_cid,
														var_ques, 
														var_ans_type,
														var_gid,
														var_sur_ans,
														var_ans,
														now()::timestamp,
														now()::timestamp);		
					end loop;

					if var_x_set != '' then
						
						var_x_set  = var_x_set ||  ', '  ||  var_ans_set::character varying;
						
					else
					
					   var_x_set = var_ans_set;
					   
					end if;					
			
				end loop;
			
				close cur_sur_ans;	

				insert into p2_rpt_feedback_tbs (	survey_id,
													survey_q_id,
													feedback_cid,
													survey_grade_id,
													survey_ans_id,
													survey_question,
													survey_ques_type,
													survey_answer,
													feedback_answer,
													created_at,
													updated_at
												)
										values  (	par_survey_id,
													var_cid,
													var_fcid,
													var_gid,
													'',
													var_ques, 
													var_ans_type,
													var_y_set,
													var_x_set,
													now()::timestamp,
													now()::timestamp);
				
			end if;
			
			if(	var_ans_type = 'Matrix / Rating Scale') then

				var_x_set = '';
				var_y_set = '';			
								
				open cur_row_data for 	select	id, matrix_value
										from	p12_mm_survey_matrices
										where	survey_id 	= par_survey_id::integer
										and 	survey_q_id = var_cid
										and 	matrix_type = 'row';
										
				loop
				
					fetch cur_row_data into var_rid, var_row_val;
					exit when not found;

					if var_y_set != '' then
						
						var_y_set  = var_y_set ||  ', '  ||  var_row_val::character varying;
						
					else
					
					   var_y_set = var_row_val;
					   
					end if;
					
					open cur_col_data for 	select	id, matrix_value
											from	p12_mm_survey_matrices
											where	survey_id 	= par_survey_id::integer
											and 	survey_q_id = var_cid
											and 	matrix_type = 'column';
											
					loop
					
						fetch cur_col_data into var_clid, var_col_val;
						exit when not found;
						
						select 	count(matrix_column_id) 	
						into 	var_ans 	
						from 	p2_trn_feedback_matrices
						where	survey_id 		 = par_survey_id::integer
						and 	survey_q_id 	 = var_cid
						and 	matrix_row_id    = var_rid
						and 	matrix_column_id = var_clid;
													
						if var_ans is null then
						
							var_ans = 0;
							
						end if;
										
						insert into p2_rpt_feedbacks (	survey_id,
														survey_title,
														survey_q_id,
														survey_question,
														survey_ques_type,
														survey_grade_id,
														survey_answer,
														feedback_answer,
														created_at,
														updated_at
													)
											values  (	par_survey_id,
														var_col_val,
														var_cid,
														var_ques, 
														var_ans_type,
														'',
														var_row_val,
														var_ans,
														now()::timestamp,
														now()::timestamp);				
					end loop;
					
					close cur_col_data;
			
				end loop;	
				
				close cur_row_data;	
				
			end if;
		
		end loop;
		
		close cur_sur_ques;

	return var_res;
	end		

$BODY$;

ALTER FUNCTION public.p2_rpt_feedbacks(character varying)
    OWNER TO postgres;

	
  end
end

class CreateP12MmSurveyC1s < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_c1s do |t|
		t.integer :survey_id
		t.string  :question
		t.string  :answer_type
		t.string  :mandatory
		t.string  :help_message
		t.string  :question_section_name
		t.string  :answer_sub_type
		t.string  :answer_scale
		t.integer :sl_no
		
		t.timestamps
    end
	
	add_foreign_key :p12_mm_survey_c1s, :p12_mm_surveys, column: :survey_id, primary_key: :id
	
	execute <<-SQL
		
		-- FUNCTION: public.p12_mm_survey_c1s_ad()

		-- DROP FUNCTION public.p12_mm_survey_c1s_ad();

		CREATE FUNCTION public.p12_mm_survey_c1s_ad()
			RETURNS trigger
			LANGUAGE 'plpgsql'
			COST 100
			VOLATILE NOT LEAKPROOF 
		AS $BODY$begin

			update p12_mm_surveys   set 	no_question = no_question::integer - 1
									where 	id = old.survey_id;
									

			return new;
									
		end$BODY$;

		ALTER FUNCTION public.p12_mm_survey_c1s_ad()
			OWNER TO postgres;
			
		-- FUNCTION: public.p12_mm_survey_c1s_ai()

		-- DROP FUNCTION public.p12_mm_survey_c1s_ai();

		CREATE FUNCTION public.p12_mm_survey_c1s_ai()
			RETURNS trigger
			LANGUAGE 'plpgsql'
			COST 100
			VOLATILE NOT LEAKPROOF 
		AS $BODY$begin

			update p12_mm_surveys   set 	no_question = no_question::integer + 1
									where 	id = new.survey_id;
					
		return new;
		end$BODY$;

		ALTER FUNCTION public.p12_mm_survey_c1s_ai()
			OWNER TO postgres;
		
		-- Trigger: p12_mm_survey_c1s_ad

		-- DROP TRIGGER p12_mm_survey_c1s_ad ON public.p12_mm_survey_c1s;

		CREATE TRIGGER p12_mm_survey_c1s_ad
			AFTER DELETE
			ON public.p12_mm_survey_c1s
			FOR EACH ROW
			EXECUTE PROCEDURE public.p12_mm_survey_c1s_ad();
			
		-- Trigger: p12_mm_survey_c1s_ai

		-- DROP TRIGGER p12_mm_survey_c1s_ai ON public.p12_mm_survey_c1s;

		CREATE TRIGGER p12_mm_survey_c1s_ai
			AFTER INSERT
			ON public.p12_mm_survey_c1s
			FOR EACH ROW
			EXECUTE PROCEDURE public.p12_mm_survey_c1s_ai();
			
		-- FUNCTION: public.p12_mm_survey_c1s(character varying, character varying, character varying)

		-- DROP FUNCTION public.p12_mm_survey_c1s(character varying, character varying, character varying);

		CREATE OR REPLACE FUNCTION public.p12_mm_survey_c1s(
			par_sur_id character varying,
			par_sur_ques character varying,
			par_sur_type character varying)
			RETURNS character varying
			LANGUAGE 'plpgsql'

			COST 100
			VOLATILE 
		AS $BODY$

			declare

			var_id	integer;
			var_res character varying;

			begin

				select 	id 
				into 	var_id  
				from   	p12_mm_survey_c1s 
				where 	survey_id   		   = par_sur_id::integer
				and		trim(question, ' ')    = trim(par_sur_ques, ' ')
				and		trim(answer_type, ' ') = trim(par_sur_type, ' ');
				
				if var_id is null then
				
					var_res = '.';
					
				else
				
					var_res = 'Duplicate question and answer type';
					
				end if;

			return var_res;
			end
						
				

		$BODY$;

		ALTER FUNCTION public.p12_mm_survey_c1s(character varying, character varying, character varying)
			OWNER TO postgres;
			
		-- FUNCTION: public.p12_mm_survey_c1s(character varying, character varying, character varying, character varying)

		-- DROP FUNCTION public.p12_mm_survey_c1s(character varying, character varying, character varying, character varying);

		CREATE OR REPLACE FUNCTION public.p12_mm_survey_c1s(
			par_sur_id character varying,
			par_sur_ques character varying,
			par_sur_type character varying,
			par_status character varying)
			RETURNS character varying
			LANGUAGE 'plpgsql'

			COST 100
			VOLATILE 
		AS $BODY$

			declare

			var_id	integer;
			var_res character varying;

			begin
			
				if par_status = 'New' then

					select 	id 
					into 	var_id  
					from   	p12_mm_survey_c1s 
					where 	survey_id   		   = par_sur_id::integer
					and		trim(question, ' ')    = trim(par_sur_ques, ' ')
					and		trim(answer_type, ' ') = trim(par_sur_type, ' ');
					
					if var_id is null then
					
						var_res = '.';
						
					else
					
						var_res = 'Duplicate question and answer type';
						
					end if;
					
				end if;
				
				if par_status = 'Edit' then
				
					select 	count(id)
					into 	var_id  
					from   	p12_mm_survey_c1s 
					where 	survey_id   		   = par_sur_id::integer
					and		trim(question, ' ')    = trim(par_sur_ques, ' ')
					and		trim(answer_type, ' ') = trim(par_sur_type, ' ');
					
					if var_id::integer <=1 then
					
						var_res = '.';
						
					else
					
						var_res = 'Duplicate question and answer type';
						
					end if;
					
				end if;

			return var_res;
			end
						
				

		$BODY$;

		ALTER FUNCTION public.p12_mm_survey_c1s(character varying, character varying, character varying, character varying)
			OWNER TO postgres;

		
		-- FUNCTION: public.p12_mm_survey_c1s_edit(character varying, character varying, character varying, character varying)

		-- DROP FUNCTION public.p12_mm_survey_c1s_edit(character varying, character varying, character varying, character varying);

		CREATE OR REPLACE FUNCTION public.p12_mm_survey_c1s_edit(
			par_sur_id character varying,
			par_sur_ques character varying,
			par_sur_type character varying,
			par_sur_q_id character varying)
			RETURNS character varying
			LANGUAGE 'plpgsql'

			COST 100
			VOLATILE 
		AS $BODY$

			declare

			var_id	integer;
			var_res character varying;

			begin
			
				select 	id 
				into 	var_id  
				from   	p12_mm_survey_c1s 
				where 	survey_id   		   = par_sur_id::integer
				and		trim(question, ' ')    = trim(par_sur_ques, ' ')
				and		trim(answer_type, ' ') = trim(par_sur_type, ' ');
				
				if var_id is null then
				
					var_res = '.';
					
				else
					
					if var_id::integer = par_sur_q_id::integer then
					
						var_res = '.';
						
					else
				
						var_res = 'Duplicate question and answer type';
						
					end if;
					
				end if;

			return var_res;
			end			
				

		$BODY$;

		ALTER FUNCTION public.p12_mm_survey_c1s_edit(character varying, character varying, character varying, character varying)
			OWNER TO postgres;

	
	SQL
	
  end
end

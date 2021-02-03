class CreateP12MmSurveyDateinfos < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_dateinfos do |t|

		t.integer	:survey_id
		t.integer	:survey_q_id
		t.string	:display_label
		t.string	:date_info
		t.string	:time_info
		t.string	:error_message
		t.string	:date_format
		t.timestamps
    end
	
		add_foreign_key :p12_mm_survey_dateinfos, :p12_mm_surveys, column: :survey_id, primary_key: :id
		
		add_foreign_key :p12_mm_survey_dateinfos, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	end
end

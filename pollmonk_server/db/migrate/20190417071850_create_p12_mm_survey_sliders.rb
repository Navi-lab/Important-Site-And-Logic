class CreateP12MmSurveySliders < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_sliders do |t|
		t.integer	:survey_id
		t.integer	:survey_q_id
		t.integer	:first_value, :default => 0
		t.integer	:middle_value, :default => 0
		t.integer	:last_value, :default => 0
		t.timestamps
    end
	
	add_foreign_key :p12_mm_survey_sliders, :p12_mm_surveys, column: :survey_id, primary_key: :id
	
	add_foreign_key :p12_mm_survey_sliders, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	
  end
end

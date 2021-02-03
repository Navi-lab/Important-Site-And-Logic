class CreateP12MmSurveyC2s < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_c2s do |t|
		t.integer  :survey_id
		t.integer  :survey_q_id
		t.string   :answer
		t.string   :answer_label
		t.timestamps
    end
	
	add_foreign_key :p12_mm_survey_c2s, :p12_mm_surveys, column: :survey_id, primary_key: :id
	add_foreign_key :p12_mm_survey_c2s, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	
  end
end

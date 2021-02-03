class CreateP12MmSurveyMatrices < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_matrices do |t|
		t.integer :survey_id
		t.integer :survey_q_id
		t.string  :matrix_type
		t.string  :matrix_value
		t.string  :matrix_ans_type
		t.integer :sl_no
		t.timestamps
    end
		add_foreign_key :p12_mm_survey_matrices, :p12_mm_surveys, column: :survey_id, primary_key: :id
		
		add_foreign_key :p12_mm_survey_matrices, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
  end
end

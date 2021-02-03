class CreateP2TrnFeedbackC1s < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_feedback_c1s do |t|
		t.integer  :feedback_id
		t.integer  :survey_id
		t.integer  :survey_q_id
		t.integer  :survey_grade_id
		t.string   :survey_answer
		t.timestamps
    end
	add_foreign_key :p2_trn_feedback_c1s, :p12_mm_surveys, column: :survey_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_c1s, :p2_trn_feedbacks, column: :feedback_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_c1s, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
  end
end

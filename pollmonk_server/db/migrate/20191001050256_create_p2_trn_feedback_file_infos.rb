class CreateP2TrnFeedbackFileInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_feedback_file_infos do |t|
		t.integer :feedback_id
		t.integer :survey_id
		t.integer :survey_q_id
		t.string  :file_path
		t.string  :file_name
		t.string  :file_size
		t.timestamps
    end
	
	add_foreign_key :p2_trn_feedback_file_infos, :p2_trn_feedbacks, column: :feedback_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_file_infos, :p12_mm_surveys, column: :survey_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_file_infos, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	
  end
end

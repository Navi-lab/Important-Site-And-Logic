class CreateP2TrnFeedbackMatrices < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_feedback_matrices do |t|
		t.integer :feedback_id
		t.integer :survey_id
		t.integer :survey_q_id
		t.integer :matrix_row_id
		t.integer :matrix_column_id
		t.string  :matrix_answer
		
		t.timestamps
    end
		add_foreign_key :p2_trn_feedback_matrices, :p2_trn_feedbacks, column: :feedback_id, primary_key: :id
		add_foreign_key :p2_trn_feedback_matrices, :p12_mm_surveys, column: :survey_id, primary_key: :id
		add_foreign_key :p2_trn_feedback_matrices, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
		add_foreign_key :p2_trn_feedback_matrices, :p12_mm_survey_matrices, column: :matrix_row_id, primary_key: :id
		add_foreign_key :p2_trn_feedback_matrices, :p12_mm_survey_matrices, column: :matrix_column_id, primary_key: :id
	
	end
end

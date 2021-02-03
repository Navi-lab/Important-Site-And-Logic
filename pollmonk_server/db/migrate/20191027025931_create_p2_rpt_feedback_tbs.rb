class CreateP2RptFeedbackTbs < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_rpt_feedback_tbs do |t|
		t.string  :survey_id
		t.string  :survey_q_id
		t.string  :feedback_cid
		t.string  :survey_grade_id
		t.string  :survey_ans_id
		t.string  :survey_question
		t.string  :survey_ques_type
		t.string  :survey_answer
		t.string  :feedback_answer
		
		t.timestamps
    end
  end
end

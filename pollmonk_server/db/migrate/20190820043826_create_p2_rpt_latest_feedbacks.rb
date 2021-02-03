class CreateP2RptLatestFeedbacks < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_rpt_latest_feedbacks do |t|
		t.string  :survey_id
		t.string  :survey_title
		t.string  :survey_q_id
		t.string  :survey_question
		t.string  :survey_ques_type
		t.string  :survey_grade_id
		t.string  :survey_answer
		t.string  :feedback_answer
		t.string  :email_id
		
		t.timestamps
		
    end
  end
end

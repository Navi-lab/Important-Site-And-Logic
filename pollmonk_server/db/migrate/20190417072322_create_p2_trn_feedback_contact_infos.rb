class CreateP2TrnFeedbackContactInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_feedback_contact_infos do |t|
		t.integer	:feedback_id
		t.integer	:survey_id
		t.integer	:survey_q_id
		t.integer	:contact_info_id
		t.string	:contact_info_value

		t.timestamps
    end
	
	add_foreign_key :p2_trn_feedback_contact_infos, :p2_trn_feedbacks, column: :feedback_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_contact_infos, :p12_mm_surveys, column: :survey_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_contact_infos, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	add_foreign_key :p2_trn_feedback_contact_infos, :p12_mm_survey_contact_infos, column: :contact_info_id, primary_key: :id	
	
  end
end

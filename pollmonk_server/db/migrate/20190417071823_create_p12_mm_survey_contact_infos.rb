class CreateP12MmSurveyContactInfos < ActiveRecord::Migration[6.0]

  def change
    create_table :p12_mm_survey_contact_infos do |t|
		t.integer	:survey_id
		t.integer	:survey_q_id
		t.string	:contact_info_type
		t.string	:contact_info_label

		t.timestamps
    end
	
	add_foreign_key :p12_mm_survey_contact_infos, :p12_mm_surveys, column: :survey_id, primary_key: :id
	
	add_foreign_key :p12_mm_survey_contact_infos, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	
  end
end

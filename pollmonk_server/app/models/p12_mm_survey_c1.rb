class P12MmSurveyC1 < ApplicationRecord

	validates :survey_id, presence: true
	validates :question, presence: true
	validates :answer_type, presence: true
	
	has_many  :p12_mm_survey_c2, foreign_key: 'survey_q_id', dependent: :destroy
	has_many  :p12_mm_survey_contact_info, foreign_key: 'survey_q_id', dependent: :destroy
	has_many  :p12_mm_survey_slider, foreign_key: 'survey_q_id', dependent: :destroy
	has_many  :p12_mm_survey_dateinfo, foreign_key: 'survey_q_id', dependent: :destroy
	has_many  :p12_mm_survey_fileupload_info, foreign_key: 'survey_q_id', dependent: :destroy
	has_many  :p12_mm_survey_matrix, foreign_key: 'survey_q_id', dependent: :destroy
end
 
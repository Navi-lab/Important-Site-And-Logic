class P12MmSurvey < ApplicationRecord

	validates :survey_name, presence: true
	validates :email_id, presence: true
	validates :survey_category, presence: true
	 
	has_many  :p12_mm_survey_c1, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_c2, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_contact_info, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_slider, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_dateinfo, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_fileupload_info, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_matrix, foreign_key: 'survey_id', dependent: :destroy
	has_many  :p12_mm_survey_group_name, foreign_key: 'survey_id', dependent: :destroy
end
 
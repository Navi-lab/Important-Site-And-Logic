class P12MmSurveyContactInfo < ApplicationRecord

	has_many  :p2_trn_feedback_contact_info, foreign_key: 'contact_info_id'
end

class P12MmSurveyC2 < ApplicationRecord

	validates :survey_id, presence: true
	validates :survey_q_id, presence: true
	#validates :answer, presence: true
end 

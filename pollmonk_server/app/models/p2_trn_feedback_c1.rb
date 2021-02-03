class P2TrnFeedbackC1 < ApplicationRecord

	validates :feedback_id, presence: true
	validates :survey_id, presence: true
	validates :survey_q_id, presence: true
	validates :survey_grade_id, presence: true

end

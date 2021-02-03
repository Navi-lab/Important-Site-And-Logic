class CreateP2TrnFeedbacks < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_feedbacks do |t|
		t.string  :uid
		t.integer :survey_id
		t.timestamps
    end
	add_foreign_key :p2_trn_feedbacks, :p12_mm_surveys, column: :survey_id, primary_key: :id
  end
end

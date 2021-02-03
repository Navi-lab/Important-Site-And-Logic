class CreateP2TrnSessionTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_session_times do |t|
		t.string  	:uid
		t.string  	:email_id
		t.integer  	:survey_id
		t.datetime	:started_at
		t.datetime	:ended_at
		t.timestamps
    end
	
	add_foreign_key :p2_trn_session_times, :p12_mm_surveys, column: :survey_id, primary_key: :id
	
  end
end

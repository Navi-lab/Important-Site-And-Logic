class CreateP2TrnEmailInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :p2_trn_email_infos do |t|
		t.string	:send_to
		t.string	:subject
		t.string	:email_body
		t.string	:url_link
		t.string	:email_id
		t.string	:uid
		t.integer	:survey_id

		t.timestamps
    end
	
	add_foreign_key :p2_trn_email_infos, :p12_mm_surveys, column: :survey_id, primary_key: :id
  
  end 
  
end

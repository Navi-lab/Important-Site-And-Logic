class AddColumnsToP2TrnFeedbacks < ActiveRecord::Migration[6.0]
  def change
	add_column :p2_trn_feedbacks, :email_id, :string
	add_column :p2_trn_feedbacks, :host_ip,  :string
	add_column :p2_trn_feedbacks, :user_info, :string
	add_column :p2_trn_feedbacks, :device_info, :string
	add_column :p2_trn_feedbacks, :location, :string
	add_column :p2_trn_feedbacks, :feedback_type, :string
  end
end

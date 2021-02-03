class CreateP12MmEmailLists < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_email_lists do |t|
		t.string  :email_id
		t.string  :upload_email
		t.string  :first_name
		t.string  :last_name
		t.string  :status, :default => 'Active'
		t.timestamps
    end
  end
end

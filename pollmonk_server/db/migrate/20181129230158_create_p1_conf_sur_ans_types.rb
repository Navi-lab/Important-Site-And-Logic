class CreateP1ConfSurAnsTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :p1_conf_sur_ans_types do |t|
		t.string	:ans_type
		t.string 	:display_label
		t.string 	:status, :default => 'Active'
		t.timestamps
    end
  end
end

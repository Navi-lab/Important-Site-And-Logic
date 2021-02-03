class CreateP1ConfContactInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :p1_conf_contact_infos do |t|
		t.string	:contact_info_col
		t.integer	:ooa
		t.timestamps
    end
  end
end

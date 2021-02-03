class CreateP1ConfSurCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :p1_conf_sur_categories do |t|
		t.string	:survey_category
		t.string 	:status, :default => 'Active'
		t.timestamps
    end
  end
end

class AddColumnsToSurCategory < ActiveRecord::Migration[6.0]
  def change
	add_column :p1_conf_sur_categories, :img_url, :string
  end
end

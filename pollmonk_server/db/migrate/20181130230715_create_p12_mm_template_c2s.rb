class CreateP12MmTemplateC2s < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_template_c2s do |t|
		t.integer  :template_id
		t.integer  :template_q_id
		t.string   :answer
		t.timestamps
    end
	
	add_foreign_key :p12_mm_template_c2s, :p12_mm_templates, column: :template_id, primary_key: :id
	add_foreign_key :p12_mm_template_c2s, :p12_mm_template_c1s, column: :template_q_id, primary_key: :id
	
  end
end

class CreateP12MmTemplateC1s < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_template_c1s do |t|
		t.integer :template_id
		t.string  :question
		t.string  :answer_type
		t.timestamps
    end
	
	add_foreign_key :p12_mm_template_c1s, :p12_mm_templates, column: :template_id, primary_key: :id
		
  end
end

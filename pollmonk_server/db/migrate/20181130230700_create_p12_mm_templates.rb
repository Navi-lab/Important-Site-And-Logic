class CreateP12MmTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_templates do |t|
		t.string  :template_name
		t.string  :survey_category
		t.string  :temp_img_path
		t.string  :description
		t.string  :no_question, :default => '0'
		t.string  :no_time_used
		t.string  :time_spent
		t.string  :status, :default => 'Active'
		t.timestamps
    end
  end
end

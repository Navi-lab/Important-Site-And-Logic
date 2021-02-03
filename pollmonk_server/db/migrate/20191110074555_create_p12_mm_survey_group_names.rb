class CreateP12MmSurveyGroupNames < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_group_names do |t|
      t.integer :survey_id
      t.string  :group_name

      t.timestamps
    end
	
	add_foreign_key :p12_mm_survey_group_names, :p12_mm_surveys, column: :survey_id, primary_key: :id
	
  end
end

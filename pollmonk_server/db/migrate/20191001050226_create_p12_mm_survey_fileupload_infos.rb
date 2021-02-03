class CreateP12MmSurveyFileuploadInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :p12_mm_survey_fileupload_infos do |t|
		t.integer :survey_id
		t.integer :survey_q_id
		t.string  :instruction
		t.string  :pdf
		t.string  :doc_docx
		t.string  :png
		t.string  :jpg_jpeg
		t.string  :gif
		t.string  :error_message
		t.timestamps
    end
	
		add_foreign_key :p12_mm_survey_fileupload_infos, :p12_mm_surveys, column: :survey_id, primary_key: :id
		
		add_foreign_key :p12_mm_survey_fileupload_infos, :p12_mm_survey_c1s, column: :survey_q_id, primary_key: :id
	
  end
end

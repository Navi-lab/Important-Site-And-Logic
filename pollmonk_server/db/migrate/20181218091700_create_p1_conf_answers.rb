class CreateP1ConfAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :p1_conf_answers do |t|
		t.string	:answer
		t.integer   :ans_scale
		t.string    :answer_abbr
		t.string 	:status, :default => 'Active'
        t.timestamps
    end
  end
end

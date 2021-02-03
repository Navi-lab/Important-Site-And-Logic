class CreateP1ConfAnsScales < ActiveRecord::Migration[6.0]
  def change
    create_table :p1_conf_ans_scales do |t|
		t.integer   :ans_scale
		t.string    :answer_abbr
		t.timestamps
    end
  end
end

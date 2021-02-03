class CreateP1ConfQuesLimits < ActiveRecord::Migration[6.0]
  def change
    create_table :p1_conf_ques_limits do |t|
		t.integer	:ques_limit
		t.timestamps
    end
  end
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_10_074555) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "duals", primary_key: "tmp", id: :string, force: :cascade do |t|
  end

  create_table "p12_mm_email_lists", force: :cascade do |t|
    t.string "email_id"
    t.string "upload_email"
    t.string "first_name"
    t.string "last_name"
    t.string "status", default: "Active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_c1s", force: :cascade do |t|
    t.integer "survey_id"
    t.string "question"
    t.string "answer_type"
    t.string "mandatory"
    t.string "help_message"
    t.string "question_section_name"
    t.string "answer_sub_type"
    t.string "answer_scale"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sl_no"
  end

  create_table "p12_mm_survey_c2s", force: :cascade do |t|
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.string "answer"
    t.string "answer_label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_contact_infos", force: :cascade do |t|
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.string "contact_info_type"
    t.string "contact_info_label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_dateinfos", force: :cascade do |t|
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.string "display_label"
    t.string "date_info"
    t.string "time_info"
    t.string "error_message"
    t.string "date_format"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_fileupload_infos", force: :cascade do |t|
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.string "instruction"
    t.string "pdf"
    t.string "doc_docx"
    t.string "png"
    t.string "jpg_jpeg"
    t.string "gif"
    t.string "error_message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_group_names", force: :cascade do |t|
    t.integer "survey_id"
    t.string "group_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_matrices", force: :cascade do |t|
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.string "matrix_type"
    t.string "matrix_value"
    t.string "matrix_ans_type"
    t.integer "sl_no"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_survey_sliders", force: :cascade do |t|
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.integer "first_value", default: 0
    t.integer "middle_value", default: 0
    t.integer "last_value", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_surveys", force: :cascade do |t|
    t.string "survey_name", limit: 10000
    t.string "survey_category"
    t.string "logo"
    t.string "logo_name"
    t.string "page_title", limit: 10000
    t.datetime "expires_at"
    t.string "description", limit: 10000
    t.string "no_question", default: "0"
    t.string "no_time_used"
    t.string "time_spent"
    t.string "progress_bar"
    t.string "one_ques_at_time"
    t.string "display_ques_no"
    t.string "welcome_text", limit: 10000
    t.string "thank_you_text", limit: 10000
    t.string "language"
    t.string "version"
    t.string "uid"
    t.string "email_id"
    t.string "status", default: "Active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_template_c1s", force: :cascade do |t|
    t.integer "template_id"
    t.string "question"
    t.string "answer_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_template_c2s", force: :cascade do |t|
    t.integer "template_id"
    t.integer "template_q_id"
    t.string "answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p12_mm_templates", force: :cascade do |t|
    t.string "template_name"
    t.string "survey_category"
    t.string "description"
    t.string "no_question", default: "0"
    t.string "no_time_used"
    t.string "time_spent"
    t.string "status", default: "Active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "temp_img_path"
  end

  create_table "p1_conf_ans_scales", force: :cascade do |t|
    t.integer "ans_scale"
    t.string "answer_abbr"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p1_conf_answers", force: :cascade do |t|
    t.string "answer"
    t.integer "ans_scale"
    t.string "answer_abbr"
    t.string "status", default: "Active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p1_conf_contact_infos", force: :cascade do |t|
    t.string "contact_info_col"
    t.integer "ooa"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p1_conf_ques_limits", force: :cascade do |t|
    t.integer "ques_limit"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p1_conf_sur_ans_types", force: :cascade do |t|
    t.string "ans_type"
    t.string "display_label"
    t.string "status", default: "Active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p1_conf_sur_categories", force: :cascade do |t|
    t.string "survey_category"
    t.string "status", default: "Active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "img_url"
  end

  create_table "p2_rpt_feedback_tbs", force: :cascade do |t|
    t.string "survey_id"
    t.string "survey_q_id"
    t.string "feedback_cid"
    t.string "survey_grade_id"
    t.string "survey_ans_id"
    t.string "survey_question"
    t.string "survey_ques_type"
    t.string "survey_answer"
    t.string "feedback_answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_rpt_feedbacks", force: :cascade do |t|
    t.string "survey_id"
    t.string "survey_title"
    t.string "survey_q_id"
    t.string "survey_question"
    t.string "survey_ques_type"
    t.string "survey_grade_id"
    t.string "survey_answer"
    t.string "feedback_answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "feedback_cid"
  end

  create_table "p2_rpt_latest_feedbacks", force: :cascade do |t|
    t.string "survey_id"
    t.string "survey_title"
    t.string "survey_q_id"
    t.string "survey_question"
    t.string "survey_ques_type"
    t.string "survey_grade_id"
    t.string "survey_answer"
    t.string "feedback_answer"
    t.string "email_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_trn_email_infos", force: :cascade do |t|
    t.string "send_to"
    t.string "subject"
    t.string "email_body"
    t.string "url_link"
    t.string "email_id"
    t.string "uid"
    t.integer "survey_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_trn_feedback_c1s", force: :cascade do |t|
    t.integer "feedback_id"
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.integer "survey_grade_id"
    t.string "survey_answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_trn_feedback_contact_infos", force: :cascade do |t|
    t.integer "feedback_id"
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.integer "contact_info_id"
    t.string "contact_info_value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_trn_feedback_file_infos", force: :cascade do |t|
    t.integer "feedback_id"
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.string "file_path"
    t.string "file_name"
    t.string "file_size"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_trn_feedback_matrices", force: :cascade do |t|
    t.integer "feedback_id"
    t.integer "survey_id"
    t.integer "survey_q_id"
    t.integer "matrix_row_id"
    t.integer "matrix_column_id"
    t.string "matrix_answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "p2_trn_feedbacks", force: :cascade do |t|
    t.string "uid"
    t.integer "survey_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email_id"
    t.string "host_ip"
    t.string "user_info"
    t.string "device_info"
    t.string "location"
    t.string "feedback_type"
  end

  create_table "p2_trn_session_times", force: :cascade do |t|
    t.string "uid"
    t.string "email_id"
    t.integer "survey_id"
    t.datetime "started_at"
    t.datetime "ended_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "p12_mm_survey_c1s", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p12_mm_survey_c2s", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p12_mm_survey_c2s", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p12_mm_survey_contact_infos", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p12_mm_survey_contact_infos", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p12_mm_survey_dateinfos", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p12_mm_survey_dateinfos", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p12_mm_survey_matrices", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p12_mm_survey_matrices", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p12_mm_survey_sliders", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p12_mm_survey_sliders", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p12_mm_template_c1s", "p12_mm_templates", column: "template_id"
  add_foreign_key "p12_mm_template_c2s", "p12_mm_template_c1s", column: "template_q_id"
  add_foreign_key "p12_mm_template_c2s", "p12_mm_templates", column: "template_id"
  add_foreign_key "p2_trn_email_infos", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p2_trn_feedback_c1s", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p2_trn_feedback_c1s", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p2_trn_feedback_c1s", "p2_trn_feedbacks", column: "feedback_id"
  add_foreign_key "p2_trn_feedback_contact_infos", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p2_trn_feedback_contact_infos", "p12_mm_survey_contact_infos", column: "contact_info_id"
  add_foreign_key "p2_trn_feedback_contact_infos", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p2_trn_feedback_contact_infos", "p2_trn_feedbacks", column: "feedback_id"
  add_foreign_key "p2_trn_feedback_matrices", "p12_mm_survey_c1s", column: "survey_q_id"
  add_foreign_key "p2_trn_feedback_matrices", "p12_mm_survey_matrices", column: "matrix_column_id"
  add_foreign_key "p2_trn_feedback_matrices", "p12_mm_survey_matrices", column: "matrix_row_id"
  add_foreign_key "p2_trn_feedback_matrices", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p2_trn_feedback_matrices", "p2_trn_feedbacks", column: "feedback_id"
  add_foreign_key "p2_trn_feedbacks", "p12_mm_surveys", column: "survey_id"
  add_foreign_key "p2_trn_session_times", "p12_mm_surveys", column: "survey_id"
end

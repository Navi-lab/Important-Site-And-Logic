import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  _g_survey_id;
  _g_user_email;
  _g_admin_email;
  _g_feedback_type;

  constructor(private http: HttpClient) {
  	this._g_survey_id     = '';
    this._g_user_email    = '';
    this._g_admin_email   = '';
    this._g_feedback_type = '';
  }

  setSurId(val: string){
    this._g_survey_id = val;
  }

  getSurId(){
    return this._g_survey_id;
  }

  setUserInfo(val: string){
    this._g_user_email = val;
  }

  getUserInfo(){
    return this._g_user_email;
  }

  setAdminEmail(val: string){
    this._g_admin_email = val;
  }

  getAdminEmail(){
    return this._g_admin_email;
  }

  setType(val: string){
    this._g_feedback_type = val;
  }

  getType(){
    return this._g_feedback_type;
  }

  validateUser(param_user, param_id){
  	return this.http.get('/p12_mm_get_survey/get_feedback_info/?email=' + param_user + '&survey_id=' + param_id);
  }

  getSurveyDetails(param_id){
  	return this.http.get('/p12_mm_get_survey/get_survey_preview/?survey_id=' + param_id);

  }

  postFeedback(param_data){

  	return this.http.post('/p2_trn_feedback', param_data);
  }

  postFbContent(param_data){

  	return this.http.post('/p2_trn_feedback_c1/batch_create', param_data);
  }

  postContact(param_data){
  	return this.http.post('/p2_trn_feedback_contact_info/batch_create', param_data);
  }

  postFileUpload(param_data){
    return this.http.post('/upload_file', param_data);
  }

  postMatScale(param_data){
    return this.http.post('/p2_trn_feedback_matrix/batch_create', param_data);
  }

  getUser(param_id){
  	return this.http.get('/p99_get_user/get_user_info/?email_id=' + btoa(param_id));
  }
}

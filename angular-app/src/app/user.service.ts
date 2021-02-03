import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  _g_user_email;
  _g_user_name;
  _g_survey_id;
  _g_survey_title;
  _g_survey_category;
  _g_survey_date;
  _g_sur_logo_url;
  _g_sur_logo_name;
  _g_screen_name;
  _g_history;

  private userDetailUrl = '/p99_get_user/get_user_details';
  private surveyCategory = '/p1_conf_sur_category';

  constructor(private http: HttpClient) { 
    this._g_user_email      = '';
    this._g_user_name       = '';
    this._g_survey_id       = '';
    this._g_survey_title    = '';
    this._g_survey_category = '';
    this._g_sur_logo_url    = '';
    this._g_history         = '';
    this._g_survey_date     = '';

  } 

  setUserEmail(val: string){
    this._g_user_email = val;
  }

  getUserEmail(){
    return this._g_user_email;
  } 

  setUserName(val: string){
    this._g_user_name = val;
  }

  getUserName(){
    return this._g_user_name;
  } 

  setSurId(val: string){
    this._g_survey_id = val;
  }

  getSurId(){
    return this._g_survey_id;
  }

  setSurTitle(val: string){
    this._g_survey_title = val;
  }

  getSurTitle(){
    return this._g_survey_title;
  }

  setSurCat(val: string){
    this._g_survey_category = val;
  }

  getSurCat(){
    return this._g_survey_category;
  }
 
  setSurLogo(val: string){
    this._g_sur_logo_url = val;
  }

  getSurLogo(){
    return this._g_sur_logo_url;
  }

  getUserDetails(){
    return this.http.get(this.userDetailUrl);
  }

  getSurveyCategory(){
    
    this.http.get(this.surveyCategory).subscribe(success=>{
      return success['data'];
    });
  }

  setScreen(val: string){
    this._g_screen_name = val;
  }

  getScreen(){
    return this._g_screen_name;
  }
 
  setLogoName(val: string){
    this._g_sur_logo_name = val;
  }

  getHistoryCount(){
    return this._g_history;
  }

  setHistoryCount(val: string){
    this._g_history = val;
  }

  getLogoName(){
    return this._g_sur_logo_name;
  }

  setSurDate(val: string){
    this._g_survey_date = val;
  }

  getSurDate(){
    return this._g_survey_date;
  } 
} 

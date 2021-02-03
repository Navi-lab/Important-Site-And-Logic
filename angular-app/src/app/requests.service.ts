import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  	constructor(
                	private http: HttpClient
               ) { }

    /*********************DB****************************/

    getCategories(){

    	return this.http.get('/p1_conf_sur_category');
    }

    getRecentSur(param_usr_email){

    	return this.http.get('/p12_mm_survey/?user_survey=' + btoa( param_usr_email))
    }

    getDrfHisCount(param_usr_email){

    	return this.http.get('/p12_mm_survey/?get_count=' + btoa( param_usr_email))
    }

    getSrchSur(param_usr_email, param_srch_key){

    	return this.http.get('/p12_mm_survey/?search_user=' +  btoa( param_usr_email) + '&search_survey=' + btoa(param_srch_key))
    }

  	getRecentSurRes(param_id){

		return this.http.get('/p12_mm_get_survey/get_db_sur_res/?survey_id='  + btoa(param_id));
	}

	/********************Survey Actions********************/

	postSurvey(main_data)
	{
		return this.http.post('/p12_mm_survey', main_data);
	}

	postImage(main_data)
	{
		const httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'multipart/form-data'
		  })
		};

		return this.http.post('/file_upload',  main_data);
	}

	putSurvey(param_id, upd_data){

		return this.http.put('/p12_mm_survey/' + btoa(param_id), upd_data);
	} 

	destroySurvey(param_id){

		return this.http.delete('/p12_mm_survey/' + btoa(param_id));
	}

	postSurQues(child_data){

		return this.http.post('/p12_mm_survey_c1', child_data);
	}

	postSurAnswer(child_data){

		return this.http.post('/p12_mm_survey_c2/batch_create', child_data);
	}
 
	postAnsSlider(child_data){

		return this.http.post('/p12_mm_survey_slider/batch_create', child_data);
	}

	postAnsContactInfo(child_data){

		return this.http.post('/p12_mm_survey_contact_info/batch_create', child_data);
	}

	postAnsDateInfo(child_data){

		return this.http.post('/p12_mm_survey_dateinfo/batch_create', child_data);
	}

	postAnsFileUpInfo(child_data){

		return this.http.post('/p12_mm_survey_fileupload_info/batch_create', child_data);
	}

	postAnsMatrix(child_data){

		return this.http.post('/p12_mm_survey_matrix/batch_create', child_data);
	}

	destroySurQues(param_id){

		return this.http.delete('/p12_mm_survey_c1/' +  btoa(param_id));
	}
 
	destroyBatchSurAns(delete_data){

		return this.http.post('/p12_mm_survey_c2/batch_delete', btoa(delete_data));
	}

	getSurvey(param_id){

		this.http.get('/p12_mm_survey/' +  btoa(param_id)).subscribe(success=>{
	      
	      return success['data'];

	    });
	}

	getSurveyMain(param_id){

		return this.http.get('/p12_mm_survey/' +  btoa(param_id));
	}

	getSurveyQues(param_id){

		return this.http.get('/p12_mm_survey_c1/?survey_id=' +  btoa(param_id));
	}

	getSurQuesAns(param_id){

		return this.http.get('/p12_mm_survey_c2/?edit_question=' +  btoa(param_id));
	}

	getSurContactAns(param_id){

		return this.http.get('/p12_mm_survey_contact_info/?survey_q_id=' + btoa(param_id));
	}

	getSurDateAns(param_id){

		return this.http.get('/p12_mm_survey_dateinfo/?survey_q_id=' +  btoa(param_id));
	}

	getSurveyTitle(param_id){

		this.http.get('/p12_mm_survey/' +  btoa(param_id)).subscribe(success=>{
	      
	      return success['data']['survey_name'];

	    });	    
	} 

	getSurFileUpAns(param_id){

		return this.http.get('/p12_mm_survey_fileupload_info/?survey_q_id=' +  btoa(param_id));
	}

	getSurMatScaleAns(param_id){

		return this.http.get('/p12_mm_survey_matrix/?survey_q_id=' +  btoa(param_id));
	}

	getSurQuesGrp(param_id){
		return this.http.get('/p12_mm_survey_c1/?get_group=' +  btoa(param_id));
	}

	/*******************Group Name*****************************/

	getSurGroup(param_id){

		return this.http.get('/p12_mm_survey_group_name/?survey_id=' +  btoa(param_id));
	}

	postSurGroup(in_data){

		return this.http.post('/p12_mm_survey_group_name', in_data);
	}

	putSurGroup(param_id, in_data){

		return this.http.put('/p12_mm_survey_group_name/' +  btoa(param_id), in_data);
	}

	destroySurGroup(param_id){

		return this.http.delete('/p12_mm_survey_group_name/' +  btoa(param_id));
	}
 
	/*******************Feedback*******************************/

	getFBContent(param_id){

		return this.http.get('/p2_trn_feedback_c1/?survey_id=' +  btoa(param_id));
	}

	getFeedback(param_id){

		return this.http.get('/p2_trn_feedback/?survey_id=' +  btoa(param_id));
	}


	/*******************Report*********************************/

	getRecentSurFun(param_usr_email){

		return this.http.get('/p2_rpt_latest_feedback/?latest_survey=' + btoa(param_usr_email));
	}

	getRecentSurId(param_usr_email){

		return this.http.get('/p2_rpt_latest_feedback/?get_survey_id=' + btoa(param_usr_email))
	}

	/******************Draft****************************/

	getDraftSur(param_usr_email){

		return this.http.get('/p12_mm_survey/?draft_survey=' + btoa(param_usr_email))
	}

	/****************Analytics*************************/

	getAnalyseCat(param_usr_email){

		return this.http.get('/p12_mm_survey/?analytic_sur_cat=' + btoa(param_usr_email));
	}

	getAnalyseList(param_usr_email){

		return this.http.get('/p12_mm_survey/?analytic_survey=' + btoa(param_usr_email));
	}

	/*****************Result***************************/
 
	getSurveyRes(param_id){

		return this.http.get('/p12_mm_get_survey/get_survey_res/?survey_id='  + btoa(param_id));
	}

	/***************SurveyDesign*********************/

	getAnswerType(){
		
		return this.http.get('/p1_conf_sur_ans_type');
	}

	getAnswerAbbr(){

		return this.http.get('/p1_conf_ans_scale/?ans_abbr=' + btoa('all'));
	}

	getAnsAbbrScale(param_abbr){
		return this.http.get('/p1_conf_ans_scale/?ans_scale=' + btoa(param_abbr));
	}

	getScaleAns(param_scale, param_ans_abbr){

		return this.http.get('/p1_conf_answer/?par_scale=' + btoa(param_scale) + '&par_ans_abbr=' + btoa(param_ans_abbr));
	} 

	getContactInfo(){

		return this.http.get('/p1_conf_contact_info/?search_key=' +  btoa('all'));
	}

	stripHtml(html){
	    
	    var temporalDivElement = document.createElement("div");
	    
	    temporalDivElement.innerHTML = html;
	    
	    return temporalDivElement.textContent || temporalDivElement.innerText || "";
	}

	chkQuestion(param_id, param_ques, param_ans){

		return this.http.get('/p12_mm_survey_c1/?survey=' + btoa(param_id) + '&survey_ques=' + btoa(param_ques) + '&survey_type=' + btoa(param_ans));
	} 

	chkTempQuestion(param_id, param_ques, param_ans){

		return this.http.get('/p12_mm_survey_c1/?survey=' + btoa(param_id) + '&survey_ques=' + btoa(param_ques) + '&survey_type=' + btoa(param_ans));
	}

	chkEditQuestion(param_id, param_ques, param_ans, param_cid){

		return this.http.get('/p12_mm_survey_c1/?survey_q=' + btoa(param_id) + '&survey_q_ques=' + btoa(param_ques) + '&survey_q_type=' + btoa(param_ans) + '&survey_q_id=' + btoa(param_cid))
	}

	getQuesLimit(){

		return this.http.get('/p1_conf_ques_limit');
    } 

    /********************Template*********************/
	getTempCatQues(param_category){
		
		return this.http.get('/p12_mm_template_c1/?category=' + btoa(param_category));
	}

	getTempCatAns(param_category){

		return this.http.get('/p12_mm_template_c2/?category=' + btoa(param_category));
	}

	getTempQuesAns(param_id){

		return this.http.get('/p12_mm_template_c2/?question_id=' + btoa(param_id));
	}

	getTemplates(){

		return this.http.get('/p12_mm_get_survey/get_templates/?template=' + btoa('all'));
	}

	getTemplateDetails(param_id){

		return this.http.get('/p12_mm_get_survey/get_template_details/?template_id=' + btoa(param_id));
	}

	/*****************Email********************/

	getEmailList(param_user){

		return this.http.get('/p12_mm_email_list/?email=' +  btoa(param_user));
	}

	postEmailList(email_data){

		return this.http.post('/p12_mm_email_list/batch_create', email_data);
	}

	postEmail(email_data){

		return this.http.post('/p2_trn_send_mail/send_email', email_data)
	}

	postDbEmail(email_data){
		return this.http.post('/p2_trn_email_info', email_data);
	}

	/*****************Survey Preview**********************/
 
	getSurPreview(param_id){

		return this.http.get('/p12_mm_get_survey/get_survey_preview/?survey_id='  + btoa(param_id));
	}

	postCopySurvey(param_data){

		return this.http.post('/p12_mm_create_survey/multiple_create', param_data);
	}
}
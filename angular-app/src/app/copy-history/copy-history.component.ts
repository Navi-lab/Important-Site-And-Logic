import { Component, OnInit, ViewChild, Inject  } from '@angular/core'; 
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-copy-history',
  templateUrl: './copy-history.component.html',
  styleUrls: ['./copy-history.component.scss']
})
export class CopyHistoryComponent implements OnInit {

	constructor(	private userService: UserService,
          			public evtEmit: EventEmitterService,
          			private httpReq: RequestsService,
	  				private router: Router,
	  				private route: ActivatedRoute) { }

	txt_prv_sur_id    = '';
	txt_prv_sur_logo  = '';
	txt_prv_sur_title = '';
	txt_prv_sur_cat   = '';
	user_name         = '';
    user_first_letter = '';
	txt_sub_url       = ''; 
	surveyList        = '';
	surveyQuesList    = '';
	surveyAnsList     = '';
	screenType        = ''; 
	isShowModal 	  = true;
	isShowLink	 	  = true;
	isShowBack	 	  = true;
	slides:any[]      = []; 
    contactInfoList:any[] = [];
    dateInfoList:any[] = [];
    fileInfoList:any[] = [];
    rbtn_value        = [];
    star_label        = []; 
    isShwSpinner      = false; 
    max:any[]      		   = [];
	min:any[]     		   = [];
	showTicks:any[] 	   = [];
	step:any[]    		   = [];
	txt_slider_value:any[] = [];
 	drpDown     		   = 0;
 	sliderData             = [];
 	txt_dsg_ans_scale      = 'Select Answer';
	surveyGrpList    	   = [];
 	tabColList         	   = [];
 	tabRowList         	   = [];
 	newGrpList         	   = [];
 	ckb_qno_val;

	ngOnInit() {

		this.route.queryParams.subscribe(params => {
	        
	        const sur_id = params.survey;

	        this.txt_prv_sur_id = atob(sur_id); 
	    });	 

    	this.getUserInfo();
		this.getSurvey();	
	} 

	getUserInfo(){ 

    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];
    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();
    		this.userService.setUserEmail(success['data']['email']);
    		this.userService.setUserName(success['data']['first_name']);
    	});
  	}

	openDropDown(){
		if(this.drpDown === 0)
		{
			this.drpDown = 1;

			let element: HTMLElement = document.getElementById('#profile');

			element.setAttribute("style", "display:block;");
		}
		else if(this.drpDown === 1)
		{
			this.drpDown = 0;

			let element: HTMLElement = document.getElementById('#profile');

			element.setAttribute("style", "display:none;");
		}
	}

	closeDropDown(){

		this.drpDown = 0;

		let element: HTMLElement = document.getElementById('#profile');

		element.setAttribute("style", "display:none;");		
	}

	loadStarLabels(val)
	{
		let labels = [];

		for(var i=0; i<this.surveyAnsList.length; i++)
		{
			if(this.surveyAnsList[i]['survey_q_id'] === val)
			{
				labels.push(this.surveyAnsList[i]['answer']);
			}
		}

		this.star_label = labels;

		return this.star_label;
	}

	getSurvey(){

	    this.httpReq.getSurPreview(this.txt_prv_sur_id).subscribe(success=>{     	

	    	this.isShwSpinner  = true;

	      	const out_data      = success['data'];
 
	      	this.surveyList      = out_data['survey_main'];
			this.surveyGrpList   = out_data['survey_grp'];
			this.surveyQuesList  = out_data['survey_ques'];
			this.surveyAnsList   = out_data['survey_ans'];
			this.contactInfoList = out_data['survey_contact'];
			this.sliderData      = out_data['survey_slider'];
			this.dateInfoList    = out_data['survey_date'];
			this.fileInfoList    = out_data['survey_file'];

		  	this.txt_prv_sur_title  = this.surveyList[0]['survey_name'];
		    this.txt_prv_sur_cat    = this.surveyList[0]['survey_category'];
		    this.txt_prv_sur_logo   = this.surveyList[0]['logo'];

		    if(this.surveyList[0]['display_ques_no'] === 'f')
	        {
	          this.ckb_qno_val = false;
	        }
	        if(this.surveyList[0]['display_ques_no'] === 't')
	        {
	          this.ckb_qno_val = true;
	        }
		    

	  		for(var i=0; i<this.surveyQuesList.length; i++)
	      	{
		        const temp  = {
		                        id: 'slide-' + (i+1),
		                        title: this.surveyQuesList[i]['question'],
		                        description: []
		                      };

		        for(var j=0; j<this.surveyAnsList.length; j++)
		        {
		          if(this.surveyQuesList[i]['id'] == this.surveyAnsList[j]['survey_q_id'])
		          {
		            const var_ans = { 'answer': this.surveyAnsList[j]['answer'] };

		            temp['description'].push(var_ans);
		          }
		        }

	        	this.slides.push(temp);

		        if(this.surveyQuesList[i]['answer_type'] === 'Slider')
		        {
		          const slider_step = this.surveyQuesList[i]['answer_scale'];

		          for(var j=0; j<this.sliderData.length; j++)
		          {
		          	if(this.sliderData[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
		          	{
			            this.max[i]        = this.sliderData[j]['last_value'];
			            this.min[i]        = this.sliderData[j]['first_value'];
			            this.showTicks[i]  = true;
			            this.step[i]       = slider_step;
			            this.txt_slider_value[i] = 0;
			        }
		          };
		        }  

		        if(this.surveyQuesList[i]['answer_type'] === 'Table')
		        {
		        	for(var j=0; j<this.surveyQuesList[i]['answer_sub_type']; j++)
		        	{
		        		const temp = {
		        						'id': i+1,
		        						'survey_q_id': this.surveyQuesList[i]['id'],
		        						'row': ''
		        					}

		        		this.tabRowList.push(temp);
		        	}
		        }
	      	}

	      	const temp = { 'question_section_name': '-'};

	      	this.newGrpList = [temp].concat(this.surveyGrpList);
	    });
	}

	/*copySurvey()
  	{
  		this.isShwSpinner   = false;

  		const in_data = {
                          "survey_name": this.surveyList[0]['survey_name'],
                          "survey_category": this.surveyList[0]['survey_category'],
                          "expires_at": this.surveyList[0]['expires_at'],
                          "email_id": this.userService.getUserEmail()
                        };        

      	let sur_ans        = [];
  		let sur_contact    = [];
  		let sur_slider     = [];
  		let sur_date_info  = [];
  		let sur_questions  = [];
  		let sur_ques_count = this.surveyQuesList.length;

  		console.log('Start ' + sur_ques_count);

      	for(var i=0; i<this.surveyQuesList.length; i++)
        {	
			if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice' || this.surveyQuesList[i]['answer_type'] === 'Checkboxes' || this.surveyQuesList[i]['answer_type'] === 'Dropdown')
		    {
		    	sur_ques_count = sur_ques_count -1;

		    	//console.log('X ' + sur_ques_count);

		    	const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],                         
		                        };

		        sur_questions.push(ques_data);

		        for(var j=0; j<this.surveyAnsList.length; j++)
        		{	
        			if(this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                  'survey_id': '',
		                                  'survey_q_id': '',
		                                  'answer': this.surveyAnsList[j]['answer'],
		                                  'sl_no': this.surveyQuesList[i]['sl_no']
		                                };

              			sur_ans.push(ans_data);
        			}
        		}
	        }

	        if(this.surveyQuesList[i]['answer_type'] === 'Comment Box' || this.surveyQuesList[i]['answer_type'] === 'Single Textbox')
	        {
	        	sur_ques_count = sur_ques_count -1;

		    	//console.log('CS ' + sur_ques_count);

	        	const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
		                          'sl_no': this.surveyQuesList[i]['sl_no']
		                        };

		        sur_questions.push(ques_data);
	        }

	        if(this.surveyQuesList[i]['answer_type'] === 'Contact Information')
	        {
	        	sur_ques_count = sur_ques_count -1;

		    	//console.log('CI ' + sur_ques_count);

	        	const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no']

		                        };

		        sur_questions.push(ques_data);

	            for(var j=0; j<this.contactInfoList.length; j++)
        		{	
        			if(this.contactInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                   'survey_id': '',
		                                   'survey_q_id': '',
		                                   'contact_info_type': this.contactInfoList[j]['contact_info_type'],
                                    	   'contact_info_label': this.contactInfoList[j]['contact_info_label'],
		                                  'sl_no': this.surveyQuesList[i]['sl_no']
		                                };

              			sur_contact.push(ans_data);
        			}
        		}	        		
	        }

	        if(this.surveyQuesList[i]['answer_type'] === 'Star Rating')
	        {
	          	sur_ques_count = sur_ques_count -1;

		    	console.log('Star ' + sur_ques_count);
		    	
		        const ques_data = {
                                  'survey_id': '',
                                  'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no']
                                };

                sur_questions.push(ques_data);
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Slider')
            {
            	sur_ques_count = sur_ques_count -1;

		    	//console.log('Slider ' + sur_ques_count);
		    	
		        const ques_data = {
                                  'survey_id': '',
                                  'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no']
                                };

                sur_questions.push(ques_data);

                for(var j=0; j<this.sliderData.length; j++)
        		{	
        			if(this.sliderData[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                   'survey_id': '',
		                                   'survey_q_id': '',
		                                   'first_value': this.sliderData[j]['first_value'],
                            				'last_value': this.sliderData[j]['last_value'],
		                          			'sl_no': this.surveyQuesList[i]['sl_no']
		                                };

              			sur_slider.push(ans_data);
        			}
        		}
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Date / Time')
	        {
	        	sur_ques_count = sur_ques_count -1;

		    	//console.log('DT ' + sur_ques_count);
		    	
		        const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no']

		                        };

		        sur_questions.push(ques_data);

		        for(var j=0; j<this.dateInfoList.length; j++)
        		{	
        			if(this.dateInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                    'survey_id': '',
		                                    'survey_q_id': '',
		                                    'display_label': this.dateInfoList[j]['display_label'],
		                                    'date_info': this.dateInfoList[j]['date_info'],
		                                    'time_info': this.dateInfoList[j]['time_info'],
		                                    'error_message': this.dateInfoList[j]['error_message'],
		                                    'date_format': this.dateInfoList[j]['date_format'],
		                                  	'sl_no': this.surveyQuesList[i]['sl_no']
		                                };

              			sur_date_info.push(ans_data);
        			}
        		}
	        }
	    }

	    //console.log('End ' + sur_ques_count);

	    if(sur_ques_count === 0)
	    {
	    	//console.log('If Inside ' + sur_ques_count);

	    	const dump_data = {
		    					'sur_main': in_data,
		    					'sur_questions': sur_questions,
		    					'sur_answers': sur_ans,
		    					'sur_date_info': sur_date_info,
		    					'sur_contact': sur_contact,
		    					'sur_slider': sur_slider
		    				};
 
		   	this.httpReq.postCopySurvey(dump_data).subscribe(success=>{

	            this.isShwSpinner   = true;
	            
	           this.router.navigate(['/survey-design'], { queryParams: { survey: btoa(success['data']['id']) } }); 

	        });
	    }
  	} */

  	copySurvey()
  	{
  		this.isShwSpinner   = false;

  		const in_data = {
                          "survey_name": this.surveyList[0]['survey_name'],
                          "survey_category": this.surveyList[0]['survey_category'],
                          "expires_at": this.surveyList[0]['expires_at'],
                          "email_id": this.userService.getUserEmail(),
                          "display_ques_no": this.surveyList[0]['display_ques_no'],
                          "logo": this.surveyList[0]['logo'],
                          "logo_name": this.surveyList[0]['logo_name']
                        };

  		let sur_questions  = [];
  		let sur_ques_count = this.surveyQuesList.length;

  		console.log('Start ' + sur_ques_count);

      	for(var i=0; i<this.surveyQuesList.length; i++)
        {	
			if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice' || this.surveyQuesList[i]['answer_type'] === 'Checkboxes' || this.surveyQuesList[i]['answer_type'] === 'Dropdown' || this.surveyQuesList[i]['answer_type'] === 'Multiple Textboxes' || this.surveyQuesList[i]['answer_type'] === 'Ranking' || this.surveyQuesList[i]['answer_type'] === 'Table')
		    {
		    	sur_ques_count = sur_ques_count -1;

		    	const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],
		                          'mandatory': this.surveyQuesList[i]['mandatory'],
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []
		                        };

		        for(var j=0; j<this.surveyAnsList.length; j++)
        		{	
        			if(this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                  'survey_id': '',
		                                  'survey_q_id': '',
		                                  'answer': this.surveyAnsList[j]['answer']
		                                };

              			ques_data['sur_ans'].push(ans_data);
        			}		        	
        		}

        		sur_questions.push(ques_data);
	        }

	        if(this.surveyQuesList[i]['answer_type'] === 'Comment Box' || this.surveyQuesList[i]['answer_type'] === 'Single Textbox')
	        {
	        	sur_ques_count = sur_ques_count -1;

	        	const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],   
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],
		                          'mandatory': this.surveyQuesList[i]['mandatory'],                      
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []
		                        };

		        sur_questions.push(ques_data);
	        }
 
	        if(this.surveyQuesList[i]['answer_type'] === 'Contact Information')
	        {
	        	sur_ques_count = sur_ques_count -1;

	        	const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],    
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],    
		                          'mandatory': this.surveyQuesList[i]['mandatory'],                               
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []

		                        };

	            for(var j=0; j<this.contactInfoList.length; j++)
        		{	
        			if(this.contactInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                   'survey_id': '',
		                                   'survey_q_id': '',
		                                   'contact_info_type': this.contactInfoList[j]['contact_info_type'],
                                    	   'contact_info_label': this.contactInfoList[j]['contact_info_label']
		                                };

              			ques_data['sur_contact'].push(ans_data);
        			}		        	
        		}	 

        		sur_questions.push(ques_data);       		
	        }

	        if(this.surveyQuesList[i]['answer_type'] === 'Star Rating')
	        {
	          	sur_ques_count = sur_ques_count -1;
		    	
		        const ques_data = {
                                  'survey_id': '',
                                  'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],      
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],  
		                          'mandatory': this.surveyQuesList[i]['mandatory'],                               
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []
                                };

                sur_questions.push(ques_data);
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Slider')
            {
            	sur_ques_count = sur_ques_count -1;
		    	
		        const ques_data = {
                                  'survey_id': '',
                                  'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],     
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],  
		                          'mandatory': this.surveyQuesList[i]['mandatory'],                    
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []                
                                };

                for(var j=0; j<this.sliderData.length; j++)
        		{	
        			if(this.sliderData[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                   'survey_id': '',
		                                   'survey_q_id': '',
		                                   'first_value': this.sliderData[j]['first_value'],
                            				'last_value': this.sliderData[j]['last_value']
		                                };

              			ques_data['sur_slider'].push(ans_data);
        			}                	
        		}

        		sur_questions.push(ques_data);
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Date / Time')
	        {
	        	sur_ques_count = sur_ques_count -1;
		    	
		        const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],    
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],
		                          'mandatory': this.surveyQuesList[i]['mandatory'],                      
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []
		                        };

		        for(var j=0; j<this.dateInfoList.length; j++)
        		{	
        			if(this.dateInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                    'survey_id': '',
		                                    'survey_q_id': '',
		                                    'display_label': this.dateInfoList[j]['display_label'],
		                                    'date_info': this.dateInfoList[j]['date_info'],
		                                    'time_info': this.dateInfoList[j]['time_info'],
		                                    'error_message': this.dateInfoList[j]['error_message'],
		                                    'date_format': this.dateInfoList[j]['date_format']
		                                };

              			ques_data['sur_date'].push(ans_data);
        			}
	        	
        		}

        		sur_questions.push(ques_data);
	        }

	        if(this.surveyQuesList[i]['answer_type'] === 'File Upload')
	        {
	        	sur_ques_count = sur_ques_count -1;
		    	
		        const ques_data = {
		                          'survey_id': '',
		                          'question': this.surveyQuesList[i]['question'],
		                          'answer_type': this.surveyQuesList[i]['answer_type'],
                                  'answer_sub_type': this.surveyQuesList[i]['answer_sub_type'],
                                  'answer_scale': this.surveyQuesList[i]['answer_scale'],
		                          'sl_no': this.surveyQuesList[i]['sl_no'],    
		                          'question_section_name':  this.surveyQuesList[i]['question_section_name'],
		                          'mandatory': this.surveyQuesList[i]['mandatory'],                      
		                          'sur_ans': [],
		                          'sur_date': [],
		                          'sur_contact': [],
		                          'sur_slider': [],
		                          'sur_file': []
		                        };

		        for(var j=0; j<this.fileInfoList.length; j++)
        		{	
        			if(this.fileInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
        			{
        				const ans_data = {
		                                    'survey_id': '',
		                                    'survey_q_id': '',
											'instruction': this.fileInfoList[j]['instruction'],
											'pdf': this.fileInfoList[j]['pdf'],
											'doc_docx': this.fileInfoList[j]['doc_docx'],
											'png':  this.fileInfoList[j]['png'],
											'jpg_jpeg': this.fileInfoList[j]['jpg_jpeg'],
											'gif': this.fileInfoList[j]['gif'],
											'error_message': this.fileInfoList[j]['error_message']
		                                };

              			ques_data['sur_file'].push(ans_data);
        			}
	        	
        		}

        		sur_questions.push(ques_data);
	        }
	    }

	    if(sur_ques_count === 0)
	    {
	    	const dump_data = {
		    					'sur_main': in_data,
		    					'sur_questions': sur_questions
		    				};
 
		   	this.httpReq.postCopySurvey(dump_data).subscribe(success=>{

	            this.isShwSpinner   = true;
	            
	           this.router.navigate(['/survey-design'], { queryParams: { survey: btoa(success['data']['id']) } }); 

	        });
	    }
  	} 
}
 
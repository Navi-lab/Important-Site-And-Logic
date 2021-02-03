import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  templateCat  = [];
  templateList = [];
  templateQues = [];
  templateAns  = [];
  answerData   = [];
  quesData     = [];
  mainData     = [];
  txt_survey_id     = '';
  txt_res_email  	  = '';
  user_name         = '';
  user_first_letter = '';
  drpDown     	= 0;
  isShowCard    	= false;
  isShowList      = true;
  isShowNewSur   	= true;
  isShowModal     = true;
  isShowTemplate  = false;
  isShowHistory   = true;
  isAnaHidden     = true;
  isAnaMsgHidden  = true;
  categoryList    = [];
  analyticSurList = [];
  surCategoryList = [];
  isShwSpinner   	= false;
  isUploadHidden 	  = false;
  isLogoHidden   	  = true;
  private base64textString:String="";
  selectedFile: File;
  up_file_name      = '';
  txt_sur_logo      = '';
  txt_survey_name   = '';
  sel_sur_category  = 'Select Category';
  dtp_sur_expire    = '';
  minDate           = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  file_upload_data  = [];

	constructor(
	  				    private router: Router,
	            	private userService: UserService,
	          		public evtEmit: EventEmitterService,
	          		private httpReq: RequestsService,
          			private datePipe: DatePipe,
            		iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
	  			) {
              iconRegistry.addSvgIcon(
                'cross',
                sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/cross-out.svg')
              );
          }

	ngOnInit() {

		this.getUserInfo();
	}

	getUserInfo(){
    	this.userService.getUserDetails().subscribe(success => {
    		this.user_name = success['data']['first_name'];

    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();

    		this.txt_res_email =  success['data']['email'];

    		this.userService.setUserEmail(success['data']['email']);

    		this.userService.setUserName(success['data']['first_name']);

	  		this.getTemplates();
	  		this.loadAnaLyticCategory();
		  	this.loadAnalyticSurvey();
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

	loadSurveyCategory(){

		this.httpReq.getCategories().subscribe(success=>{

	    	this.surCategoryList = success['data'];

	   	});
	}

	loadAnaLyticCategory(){

		this.httpReq.getAnalyseCat(this.txt_res_email).subscribe(success=>{

			this.categoryList = success['data'];
		});
	}

	loadAnalyticSurvey(){

		this.httpReq.getAnalyseList(this.txt_res_email).subscribe(success=>{

			this.analyticSurList = success['data'];

			this.isShwSpinner   = true;

			if(this.analyticSurList.length > 0)
			{
				this.isAnaHidden    = false;
    			this.isAnaMsgHidden = true;
			}
			else
			{
				this.isAnaHidden    = true;
    			this.isAnaMsgHidden = false;
			}
		});
	}

	loadShare(val: string){

		this.router.navigate(['/copy-history'], { queryParams: { survey: btoa(val) } });
	}

	loadFromHistory(){

		this.router.navigate(['/from-history']);
	}

	loadHistory(){

		this.isShowCard    	 = true;
		this.isShowList      = true;
		this.isShowNewSur    = true;
		this.isShowModal     = true;
		this.isShowTemplate  = true;
		this.isShowHistory   = false;
	}

	loadTemplateCard(){

		this.isShowCard    	 = false;
		this.isShowList      = true;
		this.isShowNewSur    = true;
		this.isShowModal     = true;
		this.isShowTemplate  = false;
		this.isShowHistory   = true;
	}

	loadDate()
	{
		console.log(this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"));

		console.log(this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"));
	}

	loadLogoName(){

	    this.up_file_name = this.userService.getLogoName();

	    if(this.up_file_name)
	    {
	      this.isUploadHidden = true;
	      this.isLogoHidden   = false;
	    }
	    else
	    {
	      this.isUploadHidden = false;
	      this.isLogoHidden   = true;
	    }
	}

	removeLog(element){
		this.userService.setLogoName('');
		this.txt_sur_logo      = '';
		this.userService.setSurLogo('');
		this.isUploadHidden    = false;
		this.isLogoHidden      = true;
    this.base64textString  = '';
    this.file_upload_data  = [];
    this.up_file_name      = '';
 }

	onFileChanged(event) {

	    const file = event.target.files[0].name.toLowerCase();

	    this.up_file_name = event.target.files[0].name;

	    const extension = file.substring(file.lastIndexOf('.') + 1);

	    if(extension === "jpg" || extension === "png")
	    {
	      this.isLogoHidden   = false;
	      this.isUploadHidden = true;

	      this.selectedFile = event.target.files[0]

	      var reader = new FileReader();

	      reader.onload = this._handleReaderLoaded.bind(this);

	      reader.readAsBinaryString(this.selectedFile);
	    }
	    else
	    {
	      this.evtEmit.toastErrMsg('Please upload jpg / png file format only');

	    }
 	}

 	_handleReaderLoaded(readerEvt) {
    this.file_upload_data  = [];
		var binaryString       = readerEvt.target.result;
		this.base64textString  = btoa(binaryString);
    const in_data = {
                      'file': this.base64textString,
                      'email_id': this.userService.getUserEmail(),
                      'survey_id': '',
                      'logo_name': ''
                    };

    this.file_upload_data.push(in_data);
	}

  onUpload() {

	    let logo_name  = '';

	    if(this.txt_sur_logo)
	    {
	      const str = this.txt_sur_logo;

	      const res = /[^/]*$/.exec(str)[0];

	      const filename = str.substring(str.lastIndexOf('/')+1);

	      const last_char = res[res.length - 5];

	      const next_val = (parseInt(last_char) + 1);

	      logo_name  = 'logo_' + next_val + '.png';
	    }
	    else
	    {
	      logo_name = 'logo_0.png';
	    }

	    if(this.file_upload_data.length > 0)
	    {
	    	let sur_date;

  			if(this.dtp_sur_expire)
  			{
  				sur_date = this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd");
  			}

      	const in_data = {
                          "survey_name": this.txt_survey_name,
                          "survey_category": this.sel_sur_category,
                          "expires_at": sur_date,
                          "email_id": this.userService.getUserEmail()
                        };

        this.userService.setSurTitle(this.txt_survey_name);

        this.userService.setSurCat(this.sel_sur_category);

  	    this.httpReq.postSurvey(in_data).subscribe(success=>{

        	const main_id = success['data']['id'];

        	this.userService.setSurId(main_id);

          this.file_upload_data[0]['survey_id'] = main_id;
          this.file_upload_data[0]['logo_name'] = logo_name;

        	/*const in_data = {
                            'file': this.base64textString,
                            'email_id': this.userService.getUserEmail(),
                            'survey_id': main_id,
                            'logo_name': logo_name
                      		};*/

  				const logo_data = {
  				                    'logo': '/subscriber_files/' + this.userService.getUserEmail() + '/' + main_id + '/logo/' + logo_name,
  				                    'logo_name': this.up_file_name
  				              	}

  				const formData = new FormData();
      			//formData.append('file', this.base64textString);
      			formData.append('email_id', this.userService.getUserEmail());
      			formData.append('survey_id', main_id);
      			formData.append('logo_name', logo_name);

  			    this.httpReq.postImage(this.file_upload_data[0]).subscribe(success=>{

  			        this.httpReq.putSurvey(main_id, logo_data).subscribe(success=>{

  			          const temp_url = '/subscriber_files/' + this.userService.getUserEmail() + '/' + main_id + '/logo/' + logo_name;

  			          this.userService.setSurLogo(temp_url)

  			          this.userService.setLogoName(this.up_file_name);

  			          this.router.navigate(['/survey-design'], { queryParams: { survey: btoa(main_id) } });

  			        });

  			    });
  			});
  	    }
	}

	createSurvey(){

      if((this.sel_sur_category != 'Select Category') && (this.txt_survey_name.length > 0))
      {
        if(this.txt_survey_name.indexOf('\'') >= 0 && this.txt_survey_name.indexOf('"') >= 0)
        {
          this.evtEmit.toastErrMsg("Enter name without Single quotes(apostrophe) and double quotes");
          return;
        }

      	if(this.file_upload_data.length > 0)
    		{
    			this.onUpload();
    		}
  		 else
  		 {
    			let sur_date;

    			if(this.dtp_sur_expire)
    			{
    				sur_date = this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd");
    			}
	        const in_data = {
	                          "survey_name": this.txt_survey_name,
	                          "survey_category": this.sel_sur_category,
	                          "expires_at": sur_date,
	                          "email_id": this.userService.getUserEmail()
	                        };

	        this.userService.setSurTitle(this.txt_survey_name);

	        this.userService.setSurCat(this.sel_sur_category);

	        this.userService.setSurDate(this.dtp_sur_expire);

	        this.httpReq.postSurvey(in_data).subscribe(success=>{

	          this.userService.setSurId(success['data']['id']);

	          this.router.navigate(['/survey-design'], { queryParams: { survey: btoa(success['data']['id']) } });

	        });
  	    }
      }
      else
      {
        this.evtEmit.toastErrMsg('Enter survey name and select survey category to continue...');
      }
    }

	loadNewSurvey(){

		this.isShowNewSur      = false;
		this.isShowModal       = true;
    this.txt_survey_name   = '';
		this.loadSurveyCategory();
	}

	closeNewSurvey(){

		this.isShowNewSur = true;
	}

	getTemplates()
	{
		this.httpReq.getTemplates().subscribe(success=>{

			const out_data    = success['data'];

			this.templateCat  = out_data['template_cat'];

			this.templateList = out_data['template'];
	    });
	}

	loadTempAnswer(val, val_1){

		this.txt_survey_name = val_1;

		this.txt_survey_id   = val;

		this.httpReq.getTemplateDetails(val).subscribe(success=>{

			const out_data    = success['data'];

			this.templateQues = out_data['template_ques'];

			this.templateAns  = out_data['template_ans'];

			this.isShowModal  = false;

		});
	}

	addTemplate()
	{
		for(var i=0; i<this.templateList.length; i++)
		{
			if(this.templateList[i]['id'] === this.txt_survey_id)
			{
				const main_data = {
									'survey_name': this.templateList[i]['template_name'],
									'survey_category': this.templateList[i]['survey_category'],
									'description': this.templateList[i]['description'],
									"email_id": this.userService.getUserEmail(),
									"display_ques_no": true
								};

				this.mainData.push(main_data);

				for(var j=0; j<this.templateQues.length; j++)
				{
					if(this.templateQues[j]['template_id'] === this.txt_survey_id)
					{
						const ques_data = {
			                              'survey_id': '',
			                              'question': this.templateQues[j]['question'],
			                              'answer_type': this.templateQues[j]['answer_type'],
			                              id: this.templateQues[j]['id']
			                            };

			            this.quesData.push(ques_data);

						if(this.templateQues[j]['answer_type'] === 'Multiple Choice' || this.templateQues[j]['answer_type'] === 'Checkboxes' || this.templateQues[j]['answer_type'] === 'Dropdown')
				        {
				            for(var k=0; k<this.templateAns.length; k++)
				            {
				            	if(this.templateAns[k]['template_q_id'] === this.templateQues[j]['id'])
				              	{
					              	const ans_data = {
					                                  	'survey_id': '',
					                                  	'survey_q_id': '',
					                                  	'answer':this.templateAns[k]['answer'],
					                                    'q_id': this.templateAns[k]['template_q_id']
					                                };

					              	this.answerData.push(ans_data);
					            }
				            }

				        }
					}
				}
			}
		}

		if(this.mainData.length > 0)
		{
			let quesCount = this.quesData.length;

			this.httpReq.postSurvey(this.mainData[0]).subscribe(success=>{

	            const sur_id = success['data']['id'];

	            this.userService.setSurId(sur_id);

				this.userService.setSurTitle(this.mainData[0]['survey_name']);

				this.userService.setSurCat(this.mainData[0]['survey_category']);

				let count = 0;

	            for(var i=0; i<this.quesData.length; i++)
	            {
	            	count = count + 1;

	            	if(this.quesData[i]['answer_type'] === 'Multiple Choice' || this.quesData[i]['answer_type'] === 'Checkboxes' || this.quesData[i]['answer_type'] === 'Dropdown')
				    {
				    	const in_data = {
			                              'survey_id': sur_id,
			                              'question': this.quesData[i]['question'],
			                              'answer_type': this.quesData[i]['answer_type'],
			                              'sl_no': count,
				                          'question_section_name': '-',
				                          'mandatory': true
			                            };

			            const temp_id = this.quesData[i]['id'];

		                this.httpReq.postSurQues(in_data).subscribe(success=>{

		                  	const sur_cid = success['data']['id'];

		                  	let child_data = [];

		                  	for(var k=0; k<this.answerData.length; k++)
							{
								if(this.answerData[k]['q_id'] === temp_id)
				              	{
					              	const ans_data = {
					                                  	'survey_id': sur_id,
					                                  	'survey_q_id': sur_cid,
					                                  	'answer':this.templateAns[k]['answer']
					                                };

					              	child_data.push(ans_data);
					            }
							}

							if(child_data.length > 0)
							{

								const cin_data = {'survey_answers': child_data};

								this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

								});
							}

		                });
		            }

		            if(this.quesData[i]['answer_type'] === 'Comment Box' || this.quesData[i]['answer_type'] === 'Single Textbox')
        			{
        				const in_data = {
			                              'survey_id': sur_id,
			                              'question': this.quesData[i]['question'],
			                              'answer_type': this.quesData[i]['answer_type'],
			                              'sl_no': count,
				                          'question_section_name': '-',
				                          'mandatory': true
			                            };

        				this.httpReq.postSurQues(in_data).subscribe(success=>{});
        			}

        			quesCount = quesCount - 1;

        			if(quesCount == 0)
			        {
			        	this.evtEmit.loadDesign(sur_id);
			        }
	            }
	        });
		}
	}

	closeTempAnswer()
	{
		this.isShowModal  = true;
	}
	load_card(){
		this.isShowList    = true;
		this.isShowCard    = false;
	}
	load_images(){
		this.isShowList    = false;
		this.isShowCard    = true;
	}
}

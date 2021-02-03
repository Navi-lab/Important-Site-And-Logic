import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

	templateCat  = [];
	templateList = [];
	templateQues = [];
	templateAns  = [];
	answerData   = [];
	quesData     = [];
	mainData     = [];
	txt_survey_id     = '';
	txt_survey_name   = '';
	user_name         = '';
  user_first_letter = '';
  txt_search        = '';
	isShowModal       = true;
	drpDown     	    = 0;

	constructor(
	  				private router: Router,
	            	private userService: UserService,
	          		public evtEmit: EventEmitterService,
	          		private httpReq: RequestsService
	  			) { }

	ngOnInit() {

		this.getUserInfo();

	}

	getUserInfo(){
    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];

    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();

    		this.userService.setUserEmail(success['data']['email']);

    		this.userService.setUserName(success['data']['first_name']);

	  		this.getTemplates();

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
}

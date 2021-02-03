import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-survey-email',
  templateUrl: './survey-email.component.html',
  styleUrls: ['./survey-email.component.scss']
})
export class SurveyEmailComponent implements OnInit {

	constructor(
				private router: Router,
	  			private route: ActivatedRoute,
            	private userService: UserService,
          		public evtEmit: EventEmitterService,
          		private httpReq: RequestsService
			) { }

	isShwUploadList     = true;
	isShwFrstUpload     = true;
	isShwMessage        = true;
	isShwSpinner        = false;
	isShowUpList        = true;
	isShwUpload         = true;
	txt_email_address   = '';
	txt_email_subject   = '';
	txt_email_welcome_txt = '';
	txt_email_body     = '';
	txt_email_link     = '';
	txt_email_sur_id   = '';
	txt_user_email     = '';
	admin_user_name    = '';
	user_name          = '';
  user_first_letter  = '';
	email_footer       = '';
	emailList:any[]    = [];
	uploadExcelList    = [];
	chk_email  		   = [];
	chk_all_email      = false;
	uploadedEmail      = [];
	drpDown     	   = 0;

	ngOnInit() {

		this.route.queryParams.subscribe(params => {

	        const sur_id = params.survey;

	        this.txt_email_sur_id = atob(sur_id);
	    });
	    this.getUserInfo();
	  	this.txt_email_welcome_txt = 'We Welcome Your Feedback';
	  	this.txt_email_body = 'Help us improve your experience by taking our short survey.';
	    this.email_footer = 'Thanks!';
	}

	getUserInfo(){

    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];
    		this.txt_user_email     = success['data']['email'];
	   		this.admin_user_name    = success['data']['first_name'];
    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();
    		this.userService.setUserEmail(success['data']['email']);
    		this.userService.setUserName(success['data']['first_name']);
	    	this.loadEmailList();

    	});
  	}

	loadUpList(){

		this.isShowUpList = false;
	}

  loadPreview(){

    this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(this.txt_email_sur_id) } });
  }

	closeUpList(){

		this.isShowUpList = true;
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

	laodBulkUpload(){

		this.userService.setScreen('Survey Email');

		this.router.navigate(['/bulk-upload'], { queryParams: { survey: btoa(this.txt_email_sur_id) } });
	}

	loadEmailList(){

		this.httpReq.getEmailList(this.txt_user_email).subscribe(success=>{

      this.uploadedEmail = success['data'];

    	if(this.uploadedEmail.length > 0)
    	{
    		this.isShwUploadList     = false;
				this.isShwFrstUpload     = true;
				this.isShwUpload         = false;
				this.isShwMessage        = true;

				for(var i=0; i<this.uploadedEmail.length; i++)
				{
					this.chk_email[i] = true;
				}

				this.chk_all_email = true;
				this.loadSelectAll();
				this.isShwSpinner  = true;
    	}
    	else
    	{
    		this.isShwUploadList     = false;
				this.isShwFrstUpload     = false;
				this.isShwUpload         = true;
				this.isShwMessage        = true;
				this.isShwSpinner        = true;
      }
	  });
	}

	loadEmailId(){

	    this.emailList    		= [];
	    this.txt_email_address  = '';

		for(var i=0; i<this.uploadedEmail.length; i++)
		{
			if(this.chk_email[i] === true)
			{
				const temp = {
								'email': this.uploadedEmail[i]['upload_email'],
								'name':  this.uploadedEmail[i]['first_name'] + ' ' + this.uploadedEmail[i]['last_name']
							}

				this.emailList.push(temp);

				this.txt_email_address += this.uploadedEmail[i]['upload_email'] + '; ';
			}
		}

		this.closeUpList();
	}

	loadSelectAll(){

		console.log(this.chk_all_email);

		if(this.chk_all_email === true)
		{
			for(var j=0; j<this.uploadedEmail.length; j++)
			{
				this.chk_email[j] = true;
			}
		}

		if(this.chk_all_email === false)
		{
			for(var j=0; j<this.uploadedEmail.length; j++)
			{
				this.chk_email[j] = false;
			}
		}
	}

	validateEmail(email) {

	    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	    return re.test(email);
	}

	alertInvalidEmail(){

		this.isShwSpinner  = false;

	    const string = this.txt_email_address;

	    const str1 = string.replace(/;([^;]*)$/,'$1');

    	const emails = str1.split(';');

	    let invalidEmails = [];

	    for (var i = 0; i < emails.length; i++) {
	      if(!this.validateEmail(emails[i].trim())) {

	        invalidEmails.push(emails[i].trim())
	      }
	    }

	    if(invalidEmails.length > 0)
	    {
	      this.isShwSpinner  = true;

	      this.evtEmit.toastErrMsg(invalidEmails + ' email address are not valid');
	    }
	    else
	    {
	    	if(this.emailList.length > 0)
	    	{
	      		this.sendEmail();
	      	}
	      	else
	      	{
	      		this.evtEmit.toastErrMsg('Select email from the library to continue...');
	      	}
	    }
	}

	sendEmail()
	{
		if(this.txt_email_subject.length > 0)
  		{
  			for(var i=0; i<this.emailList.length; i++)
		    {
				this.txt_email_link = this.evtEmit.loadEmailLink() + btoa(this.txt_email_sur_id) + "&user=" + btoa(this.emailList[i]['email']) + '&type=' + btoa('Email');

				const email_content = '<table width="100%"><tr><td><table width="100%" style="border:1px solid black;" bgcolor="#1C2A33"><tr align="center"><td width="100%" align="center"><div style="color:#fff;text-transform:uppercase;font-weight:600;font-size:1em;padding:20px 0px;letter-spacing:4px;">universal feedback management system</div></td></tr></table><table style="background:#F5F5F5;border:1px solid black;" width="100%"><tr><td width="80%" align="center"><table width="100%" style="border:0px;"><tr style="background-color:#21B25B;" align="center"><td style="padding:10px 0px;"><div><img src="https://i.ibb.co/GxsdxdZ/survey.png" width="5%"></div></td></tr><tr style="background-color:#FFF;"><td><div style="padding:1em;">'+document.getElementById("email_header").innerHTML+'</div><div style="padding:0 1em;">'+document.getElementById("email_body_text").innerHTML+'</div><div style="width:100%;text-align: center;padding:2em 0;margin-top:1em;"><a href="'+this.txt_email_link+'" style="background-color: #21B25B;color:#fff;text-decoration:none;text-transform:capitalize;padding:15px 20px;border-radius:25px;font-weight:600">Begin Survey</a></div><div style="padding:1em;">'+document.getElementById("email_footer_2").innerHTML+'</div><div style="padding:0 1em;margin-bottom:1em;">'+document.getElementById("email_footer_3").innerHTML+'</div></td></tr></table></td></tr><tr align="center"><td align="center" width="60%"><div style="padding:10px;font-size:14px;">Powered by</div><div><img src="https://i.ibb.co/LS569bT/Pollmonk-Finalized-logo.png" width="20%"></div><div style="margin:1.5em;font-size:12px;">Copyright © 2013-2019. All rights reserved.</div></td></tr></table></td></tr></table>';

				const send_to_email = this.emailList[i]['email'];

				const in_data = {
				                'send_to': this.emailList[i]['email'],
				                'subject': this.txt_email_subject,
				                'content': email_content
				              };

				const email_data = {
				                    'send_to': send_to_email,
				                    'subject': this.txt_email_subject,
				                    'email_body': '-',
				                    'url_link': this.txt_email_link,
				                    'email_id': this.txt_user_email,
				                    'survey_id': this.txt_email_sur_id

				                  }

				this.httpReq.postEmail(in_data).subscribe(success=>{

					this.httpReq.postDbEmail(email_data).subscribe(success=>{

						const upd_data = { 'status': 'Shared' }

					    this.httpReq.putSurvey(this.txt_email_sur_id, upd_data).subscribe(success=>{

					    	this.isShwUploadList = true;
							this.isShwFrstUpload = true;
							this.isShwMessage    = false;
							this.isShwSpinner  = true;
					    });
					});
				});
			}
  		}
  		else
		{
		  this.isShwSpinner  = true;
	      this.evtEmit.toastErrMsg('Enter subject to continue');
	    }
	}
}

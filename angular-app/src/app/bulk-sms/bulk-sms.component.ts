import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-bulk-sms',
  templateUrl: './bulk-sms.component.html',
  styleUrls: ['./bulk-sms.component.scss']
})
export class BulkSmsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public evtEmit: EventEmitterService,
    private httpReq: RequestsService
  ) { }

  isShwUploadList     = false;
  isShwMessage        = true;
  isShwSpinner        = false;
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
    this.isShwSpinner = true;
  }

  loadPreview(){

    this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(this.txt_email_sur_id) } });
  }

  getUserInfo(){
    this.userService.getUserDetails().subscribe(success => {
      this.user_name = success['data']['first_name'];
      this.txt_user_email     = success['data']['email'];
      this.admin_user_name    = success['data']['first_name'];
      this.user_first_letter = this.user_name.charAt(0).toUpperCase();
      this.userService.setUserEmail(success['data']['email']);
      this.userService.setUserName(success['data']['first_name']);
    });
  }

  openDropDown(){
		if(this.drpDown === 0){
			this.drpDown = 1;
			let element: HTMLElement = document.getElementById('#profile');
			element.setAttribute("style", "display:block;");
		}
		else if(this.drpDown === 1){
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

  validateNumber(number){
    //const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(number);
  }

	alertInvalidEmail(){
    this.isShwSpinner  = false;
    const string = this.txt_email_address;
    const str1 = string.replace(/;([^;]*)$/,'$1');
    const emails = str1.split(';');
    let invalidEmails = [];
    for (var i = 0; i < emails.length; i++) {
      if(!this.validateNumber(emails[i].trim())) {
        invalidEmails.push(emails[i].trim())
      }
    }
    if(invalidEmails.length > 0)
    {
      this.isShwSpinner  = true;
      this.evtEmit.toastErrMsg(invalidEmails + ' phone numbers are not valid');
    }
    else
    {
      for (var i = 0; i < emails.length; i++) {
        const temp = { 'email': emails[i] };
        this.emailList.push(temp);
      }
      this.sendEmail();
    }
	}

	sendEmail(){
    if(this.txt_email_subject.length > 0)
    {
      for(var i=0; i<this.emailList.length; i++)
      {
        this.txt_email_link = this.evtEmit.loadEmailLink() + btoa(this.txt_email_sur_id) + "&user=" + btoa(this.emailList[i]['email']) + '&type=' + btoa('SMS');

        const email_content = document.getElementById("email_header").innerHTML + '\n' + '\n' + document.getElementById("email_body_text").innerHTML + '\n' + '\n' + this.txt_email_link + '\n' + '\n' + document.getElementById("email_footer").innerHTML + '\n' + document.getElementById("email_footer_2").innerHTML + '\n' + document.getElementById("email_footer_3").innerHTML;

        const send_to_email = this.emailList[i]['email'];
        const in_data = {
          'send_to': this.emailList[i]['email'],
          'subject': this.txt_email_subject,
          'content': email_content
        };
        const email_data = {
          'send_to': send_to_email,
          'subject': this.txt_email_subject,
          'email_body': email_content,
          'url_link': this.txt_email_link,
          // 'email_id': this.txt_user_email,
          'email_id': '9036205576',
          'survey_id': this.txt_email_sur_id
        }
        this.httpReq.postEmail(in_data).subscribe(success=>{
          this.httpReq.postDbEmail(email_data).subscribe(success=>{
            const upd_data = { 'status': 'Shared' }
            this.httpReq.putSurvey(this.txt_email_sur_id, upd_data).subscribe(success=>{
              this.isShwUploadList = true;
              this.isShwMessage    = false;
              this.isShwSpinner    = true;
            });
          });
        });
      }
    }else{
      this.isShwSpinner  = true;
      this.evtEmit.toastErrMsg('Enter subject to continue');
    }
  }
}

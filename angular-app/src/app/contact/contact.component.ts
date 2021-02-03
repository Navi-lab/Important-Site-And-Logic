import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 
import { EventEmitterService } from '../event-emitter.service';
 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	constructor(
				private router: Router, 
            	private userService: UserService,
          		public evtEmit: EventEmitterService
		) {}
 
	user_name 		= '';
	txt_cnt_name  	= '';
	txt_cnt_email  	= '';
	txt_cnt_number 	= '';
	txt_cnt_details = '';

	ngOnInit(){
	}

	myRecaptcha: boolean;
 
    onScriptLoad() {
        console.log('Google reCAPTCHA loaded and is ready for use!')
    }
    
    onScriptError() {
        console.log('Something went long when loading the Google reCAPTCHA')
    }
	
	getUserInfo(){

		this.userService.getUserDetails().subscribe(success => {

		  const var_out_data = success['data'];

		  if(var_out_data != null)
		  {
		    this.user_name     = success['data']['first_name'];

		    this.userService.setUserEmail(success['data']['email']);

		    this.userService.setUserName(success['data']['first_name']);

		    this.router.navigate(['/dashboard']);
		  }
		  else
		  {
		    this.router.navigate(['/welcome-page']);
		  }       

		});
	}

	loadDashboard(){

		this.getUserInfo();
	}
 
	sendEmail(){
		if(!this.evtEmit.validateEmail(this.txt_cnt_email) && !this.evtEmit.validateNumber(this.txt_cnt_number))
		{
			this.evtEmit.toastErrMsg('Enter valid email id and contact number to continue...');
		}
	}
}

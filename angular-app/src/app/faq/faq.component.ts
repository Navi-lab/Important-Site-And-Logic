import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { Router } from '@angular/router'; 
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';  

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
	step = null;
	setStep(index: number) {
		this.step = index;
	}
	nextStep() {
		this.step++;
	}
	prevStep() {
		this.step--;
	}

  	constructor(	
  				private userService: UserService,
  				private router: Router,
          		public evtEmit: EventEmitterService,	
				iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  		) { 
  			iconRegistry.addSvgIcon(
			'add-plus',
			sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/add-plus.svg'));      
		}

  	user_name         = '';
    user_first_letter = ''; 
    drpDown     	  = 0;
    ques_color        = [];  	 

	ngOnInit() {
		this.getUserInfo();
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

	getUserInfo(){
    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];

    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();

    		this.userService.setUserEmail(success['data']['email']);

    		this.userService.setUserName(success['data']['first_name']);
    	});
  	}
} 
  
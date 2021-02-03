import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

	constructor(
				private router: Router,
                private userService: UserService,
          		public evtEmit: EventEmitterService,
          		private httpReq: RequestsService,
          		iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
			) {
				iconRegistry.addSvgIcon(
	            'analyse',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/analytics.svg'));
			}

	user_name 	         = '';
	txt_res_search       = '';
	txt_res_email  	     = '';
	txt_res_sur_name     = '';
  user_first_letter    = '';
  isAnaHidden          = true;
  isAnaMsgHidden       = true;
	categoryList         = [];
	analyticSurList      = [];
	surveyFeedBackList   = [];
  txt_search           = '';
	drpDown     	       = 0;
    public feedback_count : number = 0;
    isShwSpinner         = false;

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

	loadResult(sur_id){

		//this.httpReq.getFBContent(sur_id).subscribe(success=>{

		this.httpReq.getFeedback(sur_id).subscribe(success=>{

          this.surveyFeedBackList = success['data'];

          if(this.surveyFeedBackList.length > 0)
          {
            this.router.navigate(['/result'], { queryParams: { survey: btoa(sur_id) } });
          }
          else
          {
            this.evtEmit.toastErrMsg('No feedback');
          }

        });
	}
}

import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service'; 
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-from-history',
  templateUrl: './from-history.component.html',
  styleUrls: ['./from-history.component.scss']
})
export class FromHistoryComponent implements OnInit {

	constructor(
				private router: Router,
                private userService: UserService,
                public evtEmit: EventEmitterService,
          		private httpReq: RequestsService
			) { }

	user_name 	         = '';
	txt_res_search       = '';
	txt_res_email  	     = '';
	txt_res_sur_name     = '';
    user_first_letter    = '';
    isAnaHidden          = true;
    isAnaMsgHidden       = true;
	categoryList         = [];
	analyticSurList      = [];
	drpDown     	   	 = 0;
    isShwSpinner   		 = false;
     
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

	loadShare(val: string){

		this.router.navigate(['/copy-history'], { queryParams: { survey: btoa(val) } });
	}
}
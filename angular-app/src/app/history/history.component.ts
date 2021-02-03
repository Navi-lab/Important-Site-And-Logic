import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PagerService } from '../pager.service';
import * as _ from 'underscore';
 
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	
	constructor(
				private router: Router,
				private userService: UserService,
          		iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
          		public evtEmit: EventEmitterService,
          		private httpReq: RequestsService,
              	private datePipe: DatePipe,
              	private pagerService: PagerService
	  		) { 
	          iconRegistry.addSvgIcon(
	            'analyse',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/analytics.svg'));
	          iconRegistry.addSvgIcon(
	            'share',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/Share.svg')
	          );
	          iconRegistry.addSvgIcon(
              'edit',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/edit.svg'));          
	        } 

	txt_his_email 	  = ''; 
	hisSurList: any[] = [];
	resultList        = [];
	isHisHidden       = true;
	isHisMsgHidden    = true;
  	txt_rpt_sur_id    = '';
  	txt_dsg_sur_id    = '';
  	dtp_sur_expire    = '';
	user_name         = '';
	isShwSpinner      = false;
	isShowEditSur     = true;
  	user_first_letter = '';
  	drpDown     	  = 0;
  	minDate           = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  	allItems: any[];
    pager: any = {};
    pagedItems: any[];
    txt_search      = '';
    txt_sort        = '';

	ngOnInit() {

		this.getUserInfo(); 
	}

	getUserInfo(){
    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];

    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();

    		this.txt_his_email = success['data']['email'];

    		this.userService.setUserEmail(success['data']['email']);

    		this.userService.setUserName(success['data']['first_name']);

    		this.getHisSurvey();

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

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } 

  	getHisSurvey(){
  
		this.httpReq.getAnalyseList(this.txt_his_email).subscribe(success=>{

			this.hisSurList   = success['data'];
			this.allItems     = success['data'];
            this.setPage(1);  

			if(this.hisSurList.length > 0)  
			{
				this.isHisHidden    = false;
				this.isHisMsgHidden = true;
				this.isShwSpinner   = true;	
			}
			else
			{
				this.isHisHidden    = true;
				this.isHisMsgHidden = false;
				this.isShwSpinner   = true;
			}
		});
	} 

	loadShare(val: string){

		this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(val) } }); 

	} 
 
	loadAnalyse(val: string){

		this.httpReq.getFBContent(val).subscribe(success=>{

          this.resultList = success['data'];

          if(this.resultList.length > 0)
          {
            this.router.navigate(['/result'], { queryParams: { survey: btoa(val) } });
          }
          else
          {
            this.evtEmit.toastErrMsg('No feedback');
          } 

        });	
	}

	loadEdit(sur_id, exp_date)
	{
		this.txt_dsg_sur_id = sur_id;
		this.isShowEditSur  = false;

		if(exp_date)
		{
		  this.dtp_sur_expire    = this.datePipe.transform(exp_date,"yyyy-MM-dd");    
		}
		else
		{
		  this.dtp_sur_expire    = '';
		}
	}

	updateSurvey(){
    
	    const in_data = {
                          "expires_at": this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"),
                          "email_id": this.userService.getUserEmail()
                        }; 

        this.httpReq.putSurvey(this.txt_dsg_sur_id, in_data).subscribe(success=>{

          this.httpReq.getAnalyseList(this.txt_his_email).subscribe(success=>{

			this.hisSurList = success['data'];

			this.isShowEditSur = true;
          
          	this.evtEmit.toastSucMsg('Survey updated...');

          	this.getHisSurvey();

          });

        });
	  }

	closeEditSurvey(){

		this.isShowEditSur = true;
	}
}
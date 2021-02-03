import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router } from '@angular/router';
import { PagerService } from '../index';
import * as _ from 'underscore';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit {

	constructor(
				private router: Router,
				private userService: UserService,
          		iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
          		public evtEmit: EventEmitterService,
          		private httpReq: RequestsService,
              	private pagerService: PagerService
	  		) {
	          iconRegistry.addSvgIcon(
	            'edit',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/edit.svg'));
	          iconRegistry.addSvgIcon(
	            'delete',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/delete.svg')
	          );
	          iconRegistry.addSvgIcon(
	            'view',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/view.svg')
	          );
	        }

	txt_draft_email 	= '';
	user_name       	= '';
	isDftHidden     	= true;
	isDftMsgHidden  	= true;
	isShwSpinner    	= false;
    user_first_letter   = '';
	draftSurList: any[] = [];
	drpDown     		= 0;
  	private allItems: any[];
    pager: any = {};
    pagedItems: any[];
    txt_search      	= '';
    txt_sort        	= '';

	ngOnInit() {

		this.getUserInfo();
	}

	getUserInfo(){
    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];

    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();

    		this.txt_draft_email  = success['data']['email'];

    		this.userService.setUserEmail(success['data']['email']);

    		this.userService.setUserName(success['data']['first_name']);

	  		this.getDarftSurvey();

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

	getDarftSurvey(){

		this.httpReq.getDraftSur(this.txt_draft_email).subscribe(success=>{

		  this.draftSurList = success['data'];
		  this.allItems     = success['data'];
          this.setPage(1);

		  if(this.draftSurList.length > 0)
          {
            this.isDftHidden    = false;
            this.isDftMsgHidden = true;
            this.isShwSpinner   = true;
          }
          else
          {
            this.isDftHidden    = true;
            this.isDftMsgHidden = false;
            this.isShwSpinner   = true;
          }

		});
	}

	loadShare(val: string, val_2){

    if(val_2 > 0)
    {
		    this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(val) } });
    }
    else
    {
      this.evtEmit.toastErrMsg('No questions are added to preview');
    }
	}

	loadDesign(sur_id: string){

		this.userService.setSurId(sur_id);

		this.router.navigate(['/survey-design'], { queryParams: { survey: btoa(sur_id) } });
	}

 	deleteSurvey(val: string){

		this.httpReq.destroySurvey(val).subscribe(success=>{

			this.getDarftSurvey();

		});
	}
}

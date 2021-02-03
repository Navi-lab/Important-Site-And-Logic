import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import { MatCarousel, MatCarouselComponent,  MatCarouselSlideComponent,
  Orientation } from '@ngmodule/material-carousel';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

	constructor(
				      private router: Router,
            	private userService: UserService,
          		iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
          		private datePipe: DatePipe,
          		public evtEmit: EventEmitterService,
          		private httpReq: RequestsService
		) {
			iconRegistry.addSvgIcon(
                'bar-chart',
                sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/bar-chart.svg'));
            iconRegistry.addSvgIcon(
                'pie-chart',
                sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/pie-chart.svg'));
            iconRegistry.addSvgIcon(
                'donut-chart',
                sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/donut-chart.svg'));
            iconRegistry.addSvgIcon(
                'v-bar-chart',
                sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/v-bar-chart.svg'));
            iconRegistry.addSvgIcon(
              'cross',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/cross-out.svg')
            );
            iconRegistry.addSvgIcon(
              'plus',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/plus.svg'));
            iconRegistry.addSvgIcon(
              'edit',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/edit.svg'));
            iconRegistry.addSvgIcon(
              'delete',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/delete.svg')
            );
            iconRegistry.addSvgIcon(
	            'analyse',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/analytics.svg')
	        );
	        iconRegistry.addSvgIcon(
	            'share',
	            sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/Share.svg')
	        );
		}

	surCategoryList   = [];
	txt_survey_name   = '';
	sel_sur_category  = 'Select Category';
	user_name         = '';
	user_first_letter = '';
	dtp_sur_expire    = '';
	isShowModal       = true;
	isUploadModal     = true;

	isRecentSurHidden    = true;
	isFirstLogHidden     = true;
	txt_rpt_sur_id       = '';
	txt_rpt_sur_title;
	surveyQuesList       = '';
	surveyAnsList        = '';
	surveyFeedBackList   = '';
	surveyFeedCount      = '';

	isDonutChartHidden  = false;
	max_ticks   			  = 5;
	step_size   			  = 1;
	drpDown     			  = 0;
	isUploadHidden 			= false;
	isLogoHidden   			= true;
	private base64textString:String="";
	selectedFile: File;
	up_file_name            = '';
	txt_sur_logo            = '';
	isShwSpinner = true;
	draftCount   = '0';
	historyCount = '0';
	latestSurvey = [];
	resultList   = [];

	fushionDData       = [];
	dOtherData         = [];
	txt_db_search      = '';
	minDate            = this.datePipe.transform(new Date(),"yyyy-MM-dd");
	isShwVideo         = true;
	isShwImage         = false;
	isRecentGraphHidden = false;
	isRecentImgHidden   = true;
	isShwWelcome  	    = false;
	isShwSurCreate     = true;
	private subscription: Subscription;
  private timer: Observable<any>;
  fushionNewData    = [];

	ngOnInit() {

		this.getUserInfo();
	   	this.setTimer();
	}

	public slidesList = new Array<never>(5);

	public timings       = '250ms ease-in';
	public autoplay      = true;
	public interval      = 2500;
	public loop          = true;
	public hideArrows    = true;
	public hideIndicators = true;
	public maxWidth      = 'auto';
	public proportion    = 25;
	public no_slides     = 7;
	public overlayColor  = '#00000040';
	public hideOverlay   = true;
	public useKeyboard   = true;
	public useMouseWheel = false;

	public ngOnDestroy() {
		if ( this.subscription && this.subscription instanceof Subscription) {
			this.subscription.unsubscribe();
		}
	}

	public setTimer(){

		this.isShwWelcome  	= false;
		this.isShwSurCreate = true;
		this.timer        	= Observable.timer(5000);
		this.subscription = this.timer.subscribe(() => {

			this.isShwWelcome  	= true;
			this.isShwSurCreate = false;
		});
	}

	scrollToElement($element): void {
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}

	loadImage(){

		this.isShwVideo  = true;
		this.isShwImage  = false;
	}

	loadVideo(){

		this.isShwVideo  = false;
		this.isShwImage  = true;
	}

	loadDate()
	{
		console.log(this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"));

		console.log(this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"));
	}

	getUserInfo(){
    	this.userService.getUserDetails().subscribe(success => {

    		this.user_name = success['data']['first_name'];

    		this.user_first_letter = this.user_name.charAt(0).toUpperCase();

    		this.userService.setUserEmail(success['data']['email']);

    		this.userService.setUserName(success['data']['first_name']);

    		this.getCount();

    	});
  	}

 	getCount(){
 		this.httpReq.getRecentSur( this.userService.getUserEmail() ).subscribe(success=>{

	      this.latestSurvey = success['data'];

	      if(this.latestSurvey.length > 0)
	      {
	      	this.isRecentSurHidden = false;
			this.isFirstLogHidden  = true;
    		this.getLatestSurvey();
	      }
	      else
	      {
	      	this.isRecentSurHidden = true;
		    this.isFirstLogHidden  = false;
	      }

	      this.httpReq.getDrfHisCount(this.userService.getUserEmail() ).subscribe(success=>{
	      	var result = success['data'];

	      	if(result.length > 0)
	      	{
	      		this.draftCount   = result[0]['draft_count'];
				this.historyCount = result[0]['history_count'];
				this.userService.setHistoryCount(this.historyCount);
			}
	      	else
	      	{
	      		this.draftCount   = '0';
				this.historyCount = '0';
				this.userService.setHistoryCount(this.historyCount);
	      	}

	      });

	    });
 	}

 	getSearch(event: any){

 		if(this.txt_db_search.length > 3)
 		{
 			this.httpReq.getSrchSur(this.userService.getUserEmail(), this.txt_db_search).subscribe(success=>{

	          this.latestSurvey = success['data'];

	          if(this.latestSurvey.length <= 0)
	          {
	            this.evtEmit.toastErrMsg('No survey to display');
	          }

	        });
 		}
 		if(this.txt_db_search.length === 0)
 		{
 			this.httpReq.getRecentSur(this.userService.getUserEmail() ).subscribe(success=>{

		      this.latestSurvey = success['data'];

		    });
 		}
 	}

	loadFromHistory(){

		if(parseInt(this.historyCount) > 0)
		{
			this.router.navigate(['/from-history']);
		}
		else
		{
			this.evtEmit.toastErrMsg('No history to load...');
		}
	}

	loadSurvey(){

		this.loadSurveyCategory();

		this.isShowModal = false;
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

	closePopUp(){

		this.surCategoryList  = [];
		this.txt_survey_name  = '';
		this.sel_sur_category = 'Select Category';

		this.isShowModal     = true;

	}

	loadDraft(){

		if(parseInt(this.draftCount) > 0)
		{
			this.router.navigate(['/draft']);
		}
		else
		{
			this.evtEmit.toastErrMsg('No survey created...');
		}
	}

	loadHistory(){

		if(parseInt(this.historyCount) > 0)
		{
			this.router.navigate(['/history']);
		}
		else
		{
			this.evtEmit.toastErrMsg('No survey shared...');
		}

	}

	loadAnalytics(){

		if(parseInt(this.historyCount) > 0)
		{
			this.router.navigate(['/analytics']);
		}
		else
		{
			this.evtEmit.toastErrMsg('No survey shared...');
		}
	}

	loadSurveyCategory(){

		this.httpReq.getCategories().subscribe(success=>{

	    	this.surCategoryList = success['data'];

	   	});
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

		this.txt_sur_logo = '';

		this.userService.setSurLogo('');

		this.isUploadHidden = false;
		this.isLogoHidden   = true;

		element.value = 'undefined';

		this.selectedFile = element.value;
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
		var binaryString     = readerEvt.target.result;
		this.base64textString= btoa(binaryString);

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

	    if(this.base64textString.length > 0)
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

	          	const in_data = {
			                      'file': this.base64textString,
			                      'email_id': this.userService.getUserEmail(),
			                      'survey_id': main_id,
			                      'logo_name': logo_name
	                    		};

				const logo_data = {
				                    'logo': '/subscriber_files/' + this.userService.getUserEmail() + '/' + main_id + '/logo/' + logo_name,
				                    'logo_name': this.up_file_name
				              	}

				const formData = new FormData();
    			//formData.append('file', this.base64textString);
    			formData.append('email_id', this.userService.getUserEmail());
    			formData.append('survey_id', main_id);
    			formData.append('logo_name', logo_name);

			    this.httpReq.postImage(in_data).subscribe(success=>{

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
      	if(this.selectedFile != undefined)
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

	deleteSurvey(val: string){

		this.httpReq.destroySurvey(val).subscribe(success=>{

			this.getCount();

		});
	}

	loadShare(val: string){

		if(parseInt(this.historyCount) > 0)
		{
			this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(val) } });
		}
	}

	loadAnalyse(val: string){

		if(parseInt(this.historyCount) > 0)
		{
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
	}

	getLatestSurvey(){

		this.httpReq.getRecentSurFun( this.userService.getUserEmail()).subscribe(success=>{

	      const result = success['data'][0];

	      if(result['p12_mm_surveys'] != 'No Recent Survey')
	      {
	        this.httpReq.getRecentSurId( this.userService.getUserEmail()).subscribe(success=>{

		      this.txt_rpt_sur_id = success['data'][0]['survey_id'];

		      if(this.txt_rpt_sur_id != null)
		      {
		        this.isRecentGraphHidden = false;
	        	this.isRecentImgHidden   = true;
		        this.getSurvey();
		        this.getFeedback();
		      }
		      else
		      {
		        this.isRecentGraphHidden = true;
	        	this.isRecentImgHidden   = false;
		      }

		    });
	      }
	      else
	      {
	        this.isRecentSurHidden   = false;
	        this.isFirstLogHidden  	 = true;
	        this.isRecentGraphHidden = true;
	        this.isRecentImgHidden   = false;
	      }

	    });
	}

	getSurvey(){

	    this.txt_rpt_sur_title = this.httpReq.getSurveyTitle(this.txt_rpt_sur_id);
	}

	getFeedback(){

		this.httpReq.getRecentSurRes(this.txt_rpt_sur_id).subscribe(success => {

			const out_data      	= success['data'];

			this.surveyQuesList 	= out_data['survey_ques'];
			this.surveyAnsList  	= out_data['survey_ans'];
			this.surveyFeedBackList = out_data['survey_res'];
			this.surveyFeedCount    = out_data['survey_fbc'];

			this.getDonutGraphData();

	    });
	}

	getDonutGraphData(){

		this.isDonutChartHidden = false;
		this.isShwSpinner 		  = false;
		this.fushionDData       = [];
		this.dOtherData         = [];
    this.fushionNewData     = [];

		let temp_labels = [];

		for(var i=0; i<this.surveyQuesList.length; i++)
		{
      let ques_fb_count:number = 0;

			if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice' || this.surveyQuesList[i]['answer_type'] === 'Checkboxes' || this.surveyQuesList[i]['answer_type'] === 'Dropdown' || this.surveyQuesList[i]['answer_type'] === 'Star Rating')
			{

				let temp = {
				                id: this.surveyQuesList[i]['id'],
				                question: this.surveyQuesList[i]['question'],
                        feedback_count: 0,
				                dataSource: {
				                              chart: {
				                                theme: "fusion",
				                                legendPosition: "right",
              													showLabels: "0",
              													showValues: "1",
              													"animateClockwise": "1",
              													legendItemFontSize: "12",
              													"chartRightMargin": "40"
				                              },
				                              data: []
              				             }
				              }

				const colorPallette = ['', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f'];

				let count = 0;

				for(var l=0; l<this.surveyFeedBackList.length; l++)
				{
				  if(parseInt(this.surveyFeedBackList[l]['survey_q_id']) === parseInt(this.surveyQuesList[i]['id']))
				  {

				    count = count + 1;

            ques_fb_count = ques_fb_count + parseInt(this.surveyFeedBackList[l]['feedback_answer']);

				    const temp_ans = { "label": this.surveyFeedBackList[l]['survey_answer'],
				                      "value": this.surveyFeedBackList[l]['feedback_answer'],
				                      "color": colorPallette[count]
				                    };

				    temp['dataSource']['data'].push(temp_ans);
				  }

				}

        temp['feedback_count'] = ques_fb_count;

				this.fushionDData.push(temp);

        if(ques_fb_count > 0)
        {
          this.fushionNewData.push(temp);
        }
			}

			if(this.surveyQuesList[i]['answer_type'] === 'Ranking')
			{
				const temp = {
				                id: this.surveyQuesList[i]['id'],
				                question: this.surveyQuesList[i]['question'],
                        feedback_count: 0,
				                dataSource: {
				                              chart: {
				                                theme: "fusion",
				                                legendPosition: "right",
													showLabels: "0",
													showValues: "1",
													"animateClockwise": "1",
													legendItemFontSize: "12",
													"chartRightMargin": "40"
				                              },
				                              data: []
				                            }
				              }

				const colorPallette = ['', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f'];

				let count = 0;

				for(var l=0; l<this.surveyFeedBackList.length; l++)
				{
				  if(parseInt(this.surveyFeedBackList[l]['survey_q_id']) === parseInt(this.surveyQuesList[i]['id']))
				  {
				    count = count + 1;

            ques_fb_count = ques_fb_count + parseInt(this.surveyFeedBackList[l]['feedback_answer']);

				    const temp_ans = {
                              "label": this.surveyFeedBackList[l]['survey_answer'] + ' (' + this.surveyFeedBackList[l]['survey_title'] + ')',
				                      "value": this.surveyFeedBackList[l]['feedback_answer'],
				                      "color": colorPallette[count]
				                    };

				    temp['dataSource']['data'].push(temp_ans);
				  }
				}

        temp['feedback_count'] = ques_fb_count;

				this.fushionDData.push(temp);

        if(ques_fb_count > 0)
        {
          this.fushionNewData.push(temp);
        }
			}

      if(this.fushionNewData.length == 1)
      {
        this.autoplay = false;
      }

      if(this.fushionNewData.length == 0)
      {
        this.isRecentGraphHidden = false;
        this.isRecentImgHidden   = true;

      }

      if(this.fushionNewData.length >= 2)
      {
        this.autoplay = true;
      }

      console.log(JSON.stringify(this.fushionNewData));

		  this.isShwSpinner   = true;
		}
	}
}

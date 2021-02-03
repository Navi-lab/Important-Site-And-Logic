import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { EventEmitterService } from './event-emitter.service';
import { FeedbackServiceService } from './feedback-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit {

  location: Location;

	constructor(
            location: Location,
			  		private router: Router,
            private route: ActivatedRoute,
            private userService: UserService,
            public evtEmit: EventEmitterService,
            private appsrv: FeedbackServiceService,
			  	) { this.location = location; }

  user_name = '';

	ngOnInit(){

		this.getUserInfo();
	}

  getUserInfo(){

    const url_path  = this.location.path();

    if(url_path.includes('/feedback'))
    {
      this.getPath();
    }
    else
    {
      this.userService.getUserDetails().subscribe(success => {

      const var_out_data = success['data'];

      if(var_out_data)
      {
        this.user_name     = success['data']['first_name'];

        this.userService.setUserEmail(success['data']['email']);

        this.userService.setUserName(success['data']['first_name']);

        const url_path  = this.location.path();

        if(url_path === '/faq')
        {
          this.router.navigate(['/faq']);
        }
        else if(url_path === '/draft')
        {
          this.router.navigate(['/draft']);
        }
        else if(url_path === '/history')
        {
          this.router.navigate(['/history']);
        }
        else if(url_path === '/analytics')
        {
          this.router.navigate(['/analytics']);
        }
        else if(url_path === '/dashboard')
        {
          this.router.navigate(['/dashboard']);
        }
        else if(url_path === '/privacy')
        {
          this.router.navigate(['/privacy']);
        }
        else if(url_path === '/cookie')
        {
          this.router.navigate(['/cookie']);
        }
        else if(url_path.includes('result'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/result'], { queryParams: { survey: sur_id } });
        }
        else if(url_path.includes('survey-design'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/survey-design'], { queryParams: { survey: sur_id } });
        }
        else if(url_path.includes('survey-email'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/survey-email'], { queryParams: { survey: sur_id } });
        }
        else if(url_path.includes('copy-history'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/copy-history'], { queryParams: { survey: sur_id } });
        }
        else if(url_path === '/bulk-upload')
        {
          this.router.navigate(['/bulk-upload']);
        }
        else if(url_path === '/template')
        {
          this.router.navigate(['/template']);
        }
        else if(url_path.includes('survey-preview'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/survey-preview'], { queryParams: { survey: sur_id } });
        }
        else if(url_path.includes('survey-manual'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/survey-manual'], { queryParams: { survey: sur_id } });
        }
        else if(url_path.includes('bulk-upload'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/survey-preview'], { queryParams: { survey: sur_id } });
        }
        else if(url_path.includes('bulk-sms'))
        {
          let sur_id;

          this.route.queryParams.subscribe(params => {
            sur_id = params.survey;
          });

          this.router.navigate(['/bulk-sms'], { queryParams: { survey: sur_id } });
        }
        else if(url_path === '/create-survey')
        {
          this.router.navigate(['/create-survey']);
        }
        else
        {
          this.router.navigate(['/dashboard']);
        }
      }
      else
      {

        const url_path  = this.location.path();

        if(url_path === '/about')
        {
          this.router.navigate(['/about']);
        }
        else if(url_path === '/contact')
        {
          this.router.navigate(['/contact']);
        }
        else if(url_path === '/privacy')
        {
          this.router.navigate(['/privacy']);
        }
        else if(url_path === '/cookie')
        {
          this.router.navigate(['/cookie']);
        }
        else if(url_path === '/welcome-page')
        {
          this.router.navigate(['/welcome-page']);
        }
        else
        {
          //this.evtEmit.loadlogin();
          this.router.navigate(['/welcome-page']);
        }
      }

    });
    }
  }

  changeUserEmail(val){
    this.userService.setUserEmail(val);
  }

  changeUserName(val){
    this.userService.setUserName(val);
  }

  getPath(){

 		const url_path  	 = this.location.path();

	  	const serach_val     = /&user=/gi;

	  	if(url_path.search(serach_val) == -1)
	  	{
	  		const var_param_val  = url_path.replace('/feedback?survey=', '');

		  	const param_val      = var_param_val.split('&')[0];

		  	const var_type_val   =  '/feedback?survey=' + param_val + '&type=';

		  	const param_user_val = '';

		  	const param_type_val = url_path.replace(var_type_val, '');

	  		this.changeSurId(param_val);

	  		this.changeUserInfo(param_user_val);

	  		this.changeType(param_type_val);
	  	}
	  	else
	  	{
	  		const var_param_val  = url_path.replace('/feedback?survey=', '');

		  	const param_val      = var_param_val.split('&')[0];

		  	const var_user_val   =  '/feedback?survey=' + param_val + '&user=';

		  	const var_new_val    = var_param_val.split('&')[1];

		  	const var_new_type_val    = var_param_val.split('&')[2];

		  	//const param_user_val = url_path.replace(var_user_val, '');

		  	const param_user_val = var_new_val.replace('user=', '');

		  	const var_type_val   =  '/feedback?survey=' + param_val + '&user=' + param_user_val + '&type=';

		  	//const param_type_val = url_path.replace(var_type_val, '');

		  	const param_type_val = var_new_type_val.replace('type=', '');

	  		this.changeSurId(param_val);

	  		this.changeUserInfo(param_user_val);

	  		this.changeType(param_type_val);
	  	}

      this.router.navigate(['/feedback'], { skipLocationChange: true });

	}


	changeSurId(val){

	    this.appsrv.setSurId(val);
	}

	changeUserInfo(val){

	    this.appsrv.setUserInfo(val);
	}

	changeType(val){

	    this.appsrv.setType(val);
	}

}

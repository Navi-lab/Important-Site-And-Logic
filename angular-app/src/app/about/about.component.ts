import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 
import { EventEmitterService } from '../event-emitter.service';
 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	constructor(
				private router: Router, 
            	private userService: UserService,          	
          		public evtEmit: EventEmitterService
		) {}

	user_name = '';

	ngOnInit(){
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
}

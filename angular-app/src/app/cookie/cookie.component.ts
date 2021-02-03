import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { UserService } from '../user.service'; 

@Component({ 
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {

	constructor(
				private http: HttpClient, 
				private router: Router, 
            	private userService: UserService
		) {}

	user_name = '';

	ngOnInit(){

		//this.getUserInfo();
	}

	getUserInfo(){

		this.userService.getUserDetails().subscribe(success => {

		  const var_out_data = success['data'];

		  if(var_out_data != null)
		  {
		    this.user_name     = success['data']['first_name'];

		    this.changeUserEmail(success['data']['email']);

		    this.changeUserName(success['data']['first_name']);

		    this.router.navigate(['/dashboard']);
		  }
		  else
		  {
		    this.router.navigate(['/welcome-page']);
		  }       

		});
	}

	changeUserEmail(val){
		
		this.userService.setUserEmail(val);
	}

	changeUserName(val){
		
		this.userService.setUserName(val);
	}

	loadContact(){
	
		this.router.navigate(['/contact']);
	}

	loadAbout(){
	
		this.router.navigate(['/about']);
	}

	loadDashboard(){

		this.getUserInfo();

		//this.router.navigate(['/dashboard']);
	}

	loadCookiePolicy()
	{

		this.router.navigate(['/cookie']);
	} 

	loadPrivatePolicy()
	{

		this.router.navigate(['/privacy']);
	}

	loadLogin(){

		window.location.href = "http://192.168.2.64:80/users/sign_in";
	}
 
	loadWebsite(){

		window.open("http://www.sunplussoftware.com");

	}

}

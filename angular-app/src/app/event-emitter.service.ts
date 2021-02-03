import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  	providedIn: 'root'
})
export class EventEmitterService {

  	constructor(
  				private router: Router,
                private toastr: ToastrService
               ) { }

    loadlogin(){

		window.location.href = "/users/sign_in";
	}

	loadSignup(){

		window.location.href = "/users/sign_up";
	}

	download(param_url){

		const url = window.location.href;

      	const arr = url.split("/");

		window.open( arr[0] + '//' + arr[2] + param_url, '_blank');
	}

	loadEmailLink(){

		const url = window.location.href;

  	const arr   = url.split("/");

  	const port  = arr[2].split(':')[1];

    console.log(port);

  	if(port === undefined)
  	{
  		return arr[0] + '//' + arr[2].split(':')[0] + '/feedback/?survey=';
  	}
    else
    {
      return arr[0] + '//' + arr[2].split(':')[0] + ':' + port + '/feedback/?survey=';
    }
	}

	loadSurveyLink(param_screen, param_id){

		const url = window.location.href;

  	const arr = url.split("/");

    const port  = arr[2].split(':')[1];

    console.log(port);

  	if(port === undefined)
  	{
  		return arr[0] + '//' + arr[2].split(':')[0] + "/" + param_screen + "/?" + btoa('survey') + "=" + btoa(param_id);
  	}
    else
    {
      return arr[0] + '//' + arr[2].split(':')[0] + ':' + port + "/" + param_screen + "/?" + btoa('survey') + "=" + btoa(param_id);
    }

	}

	validateEmail(email) {

	    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	    return re.test(email);
	}

	validateNumber(number) {

	    const re =  /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

	    return re.test(number);
	}

  validateMsg(msg){
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-{}\[\]:\/;<>]+$/g;

    return regex.test(msg);
  }

	loadCreateSurvey(){

 		return this.router.navigate(['/create-survey']);
 	}

  	loadDashboard(){

		return this.router.navigate(['/dashboard']);
	}

	loadDesign(param_id){

		return this.router.navigate(['/survey-design'], { queryParams: { survey: btoa(param_id) } });;
	}

	loadTemplate(){

		return this.router.navigate(['/template']);
	}

	loadWebsite(){

		return window.open("http://www.sunplussoftware.com");

	}

	laodUpload(){

		this.router.navigate(['/bulk-upload']);
	}

	loadSurvey(){

		return this.router.navigate(['/new-survey']);
	}

	loadDraft(){

		return this.router.navigate(['/draft']);
	}

	loadHistory(){

		return this.router.navigate(['/history']);
	}

	loadContact(){

		return this.router.navigate(['/contact']);
	}

	loadAbout(){

		return this.router.navigate(['/about']);
	}

	loadFaq(){

		return this.router.navigate(['/faq']);
	}

	loadAnalytics(){

		this.router.navigate(['/analytics']);
	}

	loadCookiePolicy()
	{

		return this.router.navigate(['/cookie']);
	}

	loadPrivatePolicy()
	{
		const url = window.location.href;

      	const arr = url.split("/");

		return window.open( arr[0] + '//' + arr[2] + '/privacy');
	}

	loadEmail(param_id){

    	return this.router.navigate(['/survey-email'], { queryParams: { survey: btoa(param_id) } });
  	}

  	loadManual(param_id){

  		return this.router.navigate(['/survey-manual'], { queryParams: { survey: btoa(param_id) } });
  	}

  	loadBulkSms(param_id){
		return this.router.navigate(['/bulk-sms'], { queryParams: { survey: btoa(param_id) } });
	}

	dateDiff(val: string){
	    const survey_date = new Date(val);
	    const today       = new Date();
	    const diffc       = today.getTime() - survey_date.getTime();
	    const days        = Math.round(Math.abs(diffc/(1000*60*60*24)));

	    return days;
	}

	toastErrMsg(msg: string){

		return  this.toastr.error(msg, '', {
		          timeOut: 3000
		        });
	}

	toastSucMsg(msg: string){

		return  this.toastr.success(msg, '', {
		          timeOut: 3000
		        });
	}

	myFunction() {
		const x: HTMLElement = document.getElementById("demo");
		if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
		}
		else {
			x.className = x.className.replace(" w3-show", "");
		}
	}

	w3_open() {

	    let element: HTMLElement = document.getElementById('mySidebar');

		element.setAttribute("style", "display:block;");
	}

	w3_close() {

	    let element: HTMLElement = document.getElementById('mySidebar');

		element.setAttribute("style", "display:none;");
	}
}

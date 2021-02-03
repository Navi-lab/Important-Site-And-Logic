import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import * as alasql from 'alasql';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-survey-submit',
  templateUrl: './survey-submit.component.html',
  styleUrls: ['./survey-submit.component.scss']
})
export class SurveySubmitComponent implements OnInit {

  constructor(  private router: Router,
	  			      private route: ActivatedRoute,
            	  private userService: UserService,
          		  public evtEmit: EventEmitterService,
          		  private httpReq: RequestsService) { }

  isShowDialog     = false;
  isShowEmailModal = true;
  txt_user_email   = '';
  screenType       = '';
  data;
  uploadExcelList  = [];
  chk_email  		 = [];
  chk_all_email    = false;
  user_name        = '';
  user_first_letter = '';
  isShwSpinner     = true;
  drpDown     	 = 0;

  	ngOnInit() {

  		this.getUserInfo();
  		this.screenType = this.userService.getScreen();
  	}

	getUserInfo(){

  	this.userService.getUserDetails().subscribe(success => {

  		this.user_name = success['data']['first_name'];
  		this.user_first_letter = this.user_name.charAt(0).toUpperCase();
  		this.txt_user_email = success['data']['email'];
  		this.userService.setUserEmail(success['data']['email']);
  		this.userService.setUserName(success['data']['first_name']);
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

  validateEmail(email) {

	    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	    return re.test(email);
	}

  onFileChange(evt: any) {

  	this.isShwSpinner   = false;

		this.uploadExcelList = [];

		this.data 			 = [];

    const target: DataTransfer = <DataTransfer>(evt.target);

    const file = target.files[0].name.toLowerCase();

    const extension = file.substring(file.lastIndexOf('.') + 1);

    if(extension === "xlsx")
    {
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {

          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));

          if((this.data[0][0] === "First Name") && (this.data[0][1] === "Last Name") && (this.data[0][2] === "Email ID"))
          {
        		for(var i=1; i<this.data.length; i++)
        		{
              console.log(i);

              if((this.data[i][0] != null) && (this.data[i][2] != null))
        			{
        				if(!this.validateEmail(this.data[i][2].trim()))
                {
        			    this.isShowEmailModal = true;
        					this.isShowDialog     = false;
        					this.isShwSpinner     = true;
        					this.evtEmit.toastErrMsg('Please provide valid email id');
        				  return;
      			    }
      			    else
      			    {
        					const temp = {
                									"first_name": this.data[i][0],
                									"last_name": this.data[i][1],
                									"email_id": this.data[i][2].trim()
                								}
        					this.uploadExcelList.push(temp);
        				}
        			}
        			else
        			{
        				this.isShowEmailModal = true;
        				this.isShowDialog     = false;
        				this.isShwSpinner     = true;
        				this.evtEmit.toastErrMsg('Please provide first name and email id');
        			}
        		}

        		if(this.uploadExcelList.length > 0)
        		{
        			for(var j=0; j<this.uploadExcelList.length; j++)
        			{
        				this.chk_email[j] = true;
        			}

        			this.chk_all_email    = true;
              this.isShowEmailModal = false;
        			this.isShowDialog     = true;
        			this.isShwSpinner     = true;
        	 }
        }
        else
        {
        	this.isShwSpinner   = true;
        	this.evtEmit.toastErrMsg('Please maintain header as sample format');
        }
      };

      reader.readAsBinaryString(target.files[0]);
    }
		else
		{
			this.isShwSpinner  = true;

	    this.evtEmit.toastErrMsg('Please upload xlsx file format only');
		}
	}

	loadSelectAll(){

		if(this.chk_all_email === true)
		{
			for(var j=0; j<this.uploadExcelList.length; j++)
			{
				this.chk_email[j] = true;
			}
		}

		if(this.chk_all_email === false)
		{
			for(var j=0; j<this.uploadExcelList.length; j++)
			{
				this.chk_email[j] = false;
			}
		}
	}

	saveEmailList(){

		this.isShwSpinner   = false;

		let in_data = [];

		for(var j=0; j<this.uploadExcelList.length; j++)
		{
			if(this.chk_email[j] === true)
			{
				const temp = {
								'first_name': this.uploadExcelList[j]['first_name'],
								'last_name': this.uploadExcelList[j]['last_name'],
								'upload_email': this.uploadExcelList[j]['email_id'],
								'email_id': this.txt_user_email
							}
				in_data.push(temp);
			}
		}

		if(in_data.length > 0)
		{
			const email_data = {'email_list': in_data}

			this.httpReq.postEmailList(email_data).subscribe(success=>{

	        	this.isShwSpinner   = true;

	        	if(this.screenType === 'Survey Email')
	        	{
	        		this.route.queryParams.subscribe(params => {

				        const sur_id = params.survey;

				        this.router.navigate(['/survey-preview'], { queryParams: { survey: sur_id } });
				    });

	        		//this.evtEmit.loadHistory();
	        	}
	        	else
	        	{
	        		this.evtEmit.loadDashboard();
	        	}

				this.evtEmit.toastSucMsg('Emails are uploaded');
		    });
		}
		else
		{
			this.isShwSpinner  = true;

	        this.evtEmit.toastErrMsg('Please select emails to be uploaded');
	    }
	}

	loadClear(){

		this.uploadExcelList  = [];
		this.data 			  = [];
		this.isShowEmailModal = true;
		this.isShowDialog     = false;
		this.chk_all_email    = false;
		this.isShwSpinner     = true;
	}

	downLoadSample()
	{
		const mystyle = {
		                  sheetid: 'Sample',
		                  headers: true,
		                };

		const temp = [
						{
							'first_name': '',
							'last_name': '',
							'email': '',
						}
					];

		alasql('SELECT  first_name AS [First Name], \
		                last_name AS [Last Name], \
		                email AS [Email ID]\
		          INTO  XLSX("Sample.xlsx",?) \
		          FROM ?',[mystyle, temp]);
	}

}

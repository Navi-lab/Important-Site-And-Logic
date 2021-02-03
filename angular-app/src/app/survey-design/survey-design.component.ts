import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { DatePipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-survey-design',
  templateUrl: './survey-design.component.html',
  styleUrls: ['./survey-design.component.scss']
})

export class SurveyDesignComponent implements OnInit {

	constructor(
				      private router: Router,
              private route: ActivatedRoute,
            	private userService: UserService,
              public evtEmit: EventEmitterService,
              private httpReq: RequestsService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private datePipe: DatePipe
  			) {
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
              'remove',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/remove.svg')
            );
            iconRegistry.addSvgIcon(
              'add',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/add.svg')
            );
            iconRegistry.addSvgIcon(
              'cross',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/cross-out.svg')
            );
            iconRegistry.addSvgIcon(
              'setting',
              sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/gear.svg')
            );
        }

  @ViewChild('fileInput', {static: false}) myInputVariable;

	surCategoryList = [];
	txt_dsg_sur_ques  = '';
	txt_dsg_sur_title = '';
	txt_dsg_sur_cat   = 'Category';
	txt_dsg_sur_logo  = '';
	txt_dsg_sur_id    = '';
  dtp_sur_expire    = '';
	txt_dsg_ans_type  = 'Answer Type';
	txt_dsg_ans_abbr  = '';
	txt_dsg_ans_scale = '';
	txt_dsg_sur_cid   = '';
	txt_dsg_ques_limit:number = 0;
	user_name      = '';
  isUploadHidden = false;
  isLogoHidden   = true;
  isShowEditSur  = true;
  drpDown         = 0;
	questionsList: any[]  = [];
  quesAnswerList: any[] = [];
  questLeftList: any[]  = [];
  questRghtList: any[]  = [];
	surveyCatList     = '';
	ansAbbrList: any[] = [];
	ansScaleList: any[]= [];
	ansTypeList       = '';
	answersList       = '';
	childInsData      = [];
	addedAnswerList   = '';
	var_temp_ans      = '';
	tempAnswersList   = [];
	contactList       = [];
	ckb_contact_lbl   = [];
	addedContactList  = [];
	addedQuesList: any[] = [];
	txt_answers:any[] = [];
	txt_rbtn:any[]    = [];
	txt_contact_lbl:any[] = [];
	isAnsAbbrHidden    = true;
	isAnsScaleHidden   = true;
	isSaveBtnHidden    = true;
	isAnsListHidden    = true;
	isCommentHidden    = true;
	isChkListHidden    = true;
	isSingleTextHidden = true;
	isDropDwnHidden    = true;
	isContactHidden    = true;
  isstarHidden       = true;
  isSlider           = true;
  isDatePickerHidden = true;
  isXTextHidden      = true;
  isQuestAdded       = true;
  isQuesMsgDisplay   = true;
  isShowQuestionModal = true;
  isShowPreviewModal  = true;
  isShowPreQuesModal  = true;
  isShwSpinner        = true;
  isRankingHidden     = true;
  isMatrixHidden      = true;
  isImageChoiceHidden = true;
  user_first_letter   = '';
  up_file_name        = '';
  previous_logo_path  = '';
  txt_previous_title  = '';
  barType             = '';
  barMaxLength        = 5;
  star_label_chk      = false;
  txt_slider_max      = 100;
  txt_slider_min      = 0;
  txt_slider_step     = 1;
  rbtn_date_format    = '';
  ckb_time_info       = true;
  ckb_date_info       = true;
  txt_date_message    = 'Please enter a valid date.';
	selectedFile: File
	private base64textString:String="";
  minDate            = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  edit_sl_no;
  inst_file           = '';
  ckb_pdf_info        = true;
  ckb_doc_info        = true;
  ckb_png_info        = true;
  ckb_jpg_info        = true;
  ckb_gif_info        = true;
  isFileUploadHidden  = true;
  txt_file_message    = 'Only PDF, DOC, DOCX, PNG, JPG, JPEG, GIF files are suported.';
  tempColAnsList      = [];
  txt_col_answers     = [];

  isImageUploadHidden   = [false];
  fileData: File        = null;
  selectedImage:any[]   = [];
  fileUploadProgress: string = null;
  uploadPreview:any[]   = [];
  upload_file_name      = '';
  imageIns              = [];
  new_index             = 0;
  isTable               = true;
  txt_row_count         = 0;
  txt_col_count         = 0;
  isShowGroupModal      = true;
  txt_group_name        = '';
  txt_group_id          = '';
  isGroupName           = true;
  txt_dsg_assign_grp    = 'Select Group';
  ansGroupList          = '';
  isGrpAdded            = true;
  isGrpMsg              = true;
  quesGroupList         = [];
  isLoadSettings        = true;
  color                 = '#21b25b';
  checked               = true;
  disabled              = false;
  ckb_qno_val;
  ckb_ques_val          = false;
  file_upload_data      = [];

	ngOnInit() {

		this.route.queryParams.subscribe(params => {

        const sur_id = params.survey;

        this.txt_dsg_sur_id = atob(sur_id);
    });

    this.getUserInfo();
    this.getQuesLimit();
		this.getSurveyCategory();
		this.getAnsType();
	}

  getUserInfo(){

    this.userService.getUserDetails().subscribe(success => {

      this.user_name = success['data']['first_name'];
      this.user_first_letter = this.user_name.charAt(0).toUpperCase();
      this.userService.setUserEmail(success['data']['email']);
      this.userService.setUserName(success['data']['first_name']);
      this.getSurMain();
    });
  }

  getSurMain(){

    this.httpReq.getSurveyMain(this.txt_dsg_sur_id).subscribe(success => {
        this.txt_dsg_sur_title  = success['data']['survey_name'];
        this.txt_previous_title = success['data']['survey_name'];
        this.txt_dsg_sur_cat    = success['data']['survey_category'];
        this.txt_dsg_sur_logo   = success['data']['logo'];
        this.previous_logo_path = success['data']['logo'];
        if(success['data']['display_ques_no'] === 'f')
        {
          this.ckb_qno_val = false;
        }
        if(success['data']['display_ques_no'] === 't')
        {
          this.ckb_qno_val = true;
        }

        if(this.txt_dsg_sur_logo)
        {
          const in_data = {
                            'file': this.base64textString,
                            'email_id': this.userService.getUserEmail(),
                            'survey_id': this.txt_dsg_sur_id,
                            'logo_name': success['data']['logo_name']
                          };
          this.file_upload_data.push(in_data);
        }
        this.loadDate(success['data']['expires_at']);
        this.loadLogoName(success['data']['logo_name']);
        this.getAddedQues();
        this.getGroupName();
    });
  }

  getSurQuesGroup(){

    this.httpReq.getSurQuesGrp(this.txt_dsg_sur_id).subscribe(success => {
      this.quesGroupList = success['data'];
    });
  }

  openNav() {

    let sidebar: HTMLElement = document.getElementById('mySidebar');
    sidebar.setAttribute("style", "width: 350px;");
  }

  closeNav() {

    let sidebar: HTMLElement = document.getElementById('mySidebar');
    sidebar.setAttribute("style", "width: 0;");
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    placeholder: 'Type your Question',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true
  };

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  loadSettings()
  {
    this.isLoadSettings = false;
  }

  loadDate(sur_date)
  {
    if(sur_date)
    {
      this.dtp_sur_expire    = this.datePipe.transform(sur_date,"yyyy-MM-dd");
    }
    else
    {
      this.dtp_sur_expire    = '';
    }

  }

  loadLogoName(name){

    this.up_file_name = name;

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

  loadEditSurvey()
  {
    this.txt_previous_title = this.txt_dsg_sur_title;
    this.isShowEditSur      = false;
  }

  closeEditSurvey()
  {
    this.isShowEditSur = true;
  }

  addGroup(){
    this.isShowGroupModal = false;
  }

  closeGroupModal(){
    this.isShowGroupModal = true;
  }

  updateSurvey(){

    //console.log(JSON.stringify(this.file_upload_data));

    if(this.txt_previous_title.length > 0)
    {
      if(this.txt_previous_title.indexOf('\'') >= 0 && this.txt_previous_title.indexOf('"') >= 0)
      {
        this.evtEmit.toastErrMsg("Enter name without Single quotes(apostrophe) and double quotes");
        return;
      }

      console.log(JSON.stringify(this.file_upload_data));

      if(this.file_upload_data.length > 0)
      {
        if(this.file_upload_data[0]['file'])
        {
          this.onUpload('Update');
        }
        else
        {
          if(this.file_upload_data.length <=0)
          {
            this.txt_dsg_sur_logo = '';

            const in_data = {
                              "survey_name": this.txt_previous_title,
                              "expires_at": this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"),
                              "logo_name": this.userService.getLogoName(),
                              "logo": this.userService.getSurLogo(),
                              "email_id": this.userService.getUserEmail()
                            };

            this.httpReq.putSurvey(this.txt_dsg_sur_id, in_data).subscribe(success=>{

              this.txt_dsg_sur_title = this.txt_previous_title;

              this.getSurMain();

              this.evtEmit.toastSucMsg('Survey updated...');

              this.isShowEditSur = true;

            });
          }
          else
          {
            const in_data = {
                              "survey_name": this.txt_previous_title,
                              "expires_at": this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"),
                              "email_id": this.userService.getUserEmail()
                            };

            this.httpReq.putSurvey(this.txt_dsg_sur_id, in_data).subscribe(success=>{

              this.txt_dsg_sur_title = this.txt_previous_title;

              this.getSurMain();

              this.evtEmit.toastSucMsg('Survey updated...');

              this.isShowEditSur = true;

            });
          }
        }
      }
      else
      {
        this.txt_dsg_sur_logo = '';

        const in_data = {
                          "survey_name": this.txt_previous_title,
                          "expires_at": this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"),
                          "logo_name": this.userService.getLogoName(),
                          "logo": this.userService.getSurLogo(),
                          "email_id": this.userService.getUserEmail()
                        };

        this.httpReq.putSurvey(this.txt_dsg_sur_id, in_data).subscribe(success=>{

          this.txt_dsg_sur_title = this.txt_previous_title;

          this.getSurMain();

          this.evtEmit.toastSucMsg('Survey updated...');

          this.isShowEditSur = true;

        });
      }
    }
    else
    {
      this.evtEmit.toastErrMsg('Enter survey name to continue...');
    }
  }

  removeLog(element){
    this.userService.setLogoName('');
    this.userService.setSurLogo('');
    this.isUploadHidden     = false;
    this.isLogoHidden       = true;
    this.base64textString   = '';
    this.file_upload_data   = [];
    this.up_file_name       = '';
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

  getQuesLimit(){

    this.httpReq.getQuesLimit().subscribe(success=>{

      this.txt_dsg_ques_limit = success['data'][0]['ques_limit'];

    });
  }

  loadRecomQues(){

    this.getSurCatQues(this.txt_dsg_sur_cat);
    this.isShowQuestionModal = false;
  }

  loadPreviewQues(){

    this.isShowPreviewModal  = false;
  }

  closeRQModal(){

    this.isShowQuestionModal = true;
  }

  closePrvModal(){

    this.isShowPreviewModal  = true;
  }

  getGroupName(){

    this.httpReq.getSurGroup(this.txt_dsg_sur_id).subscribe(success=>{

        this.ansGroupList = success['data'];

        if(this.ansGroupList.length > 0)
        {
          this.isGrpAdded   = false;
          this.isGrpMsg     = true;
          this.isGroupName  = false;
        }
        else
        {
          this.isGrpAdded   = true;
          this.isGrpMsg     = false;
          this.isGroupName  = true;
        }
    });

  }

  createGroup(){

    //console.log(this.txt_group_id);

    if(this.txt_group_name.length >0)
    {
      if(this.txt_group_id != '')
      {
        const in_data = {
                        'survey_id': this.txt_dsg_sur_id,
                        'group_name': this.txt_group_name
                      }

        this.httpReq.putSurGroup(this.txt_group_id, in_data).subscribe(success=>{

          this.txt_group_name  = '';
          this.txt_group_id    = '';

          this.getGroupName();

        });
      }
      else
      {
        const in_data = {
                          'survey_id': this.txt_dsg_sur_id,
                          'group_name': this.txt_group_name
                        }

        this.httpReq.postSurGroup(in_data).subscribe(success=>{

          this.txt_group_name  = '';
          this.txt_group_id    = '';

          this.getGroupName();

        });
      }
    }
    else
    {
      this.evtEmit.toastErrMsg('Group name is mandatory...');
    }
  }

  loadEditGrp(grp_id, grp_name){

    this.txt_group_name  = grp_name;
    this.txt_group_id    = grp_id;
  }

  deleteGroup(grp_id){

    this.httpReq.destroySurGroup(grp_id).subscribe(success=>{

      this.getGroupName();

    });
  }

	getSurCatQues(val){

		this.httpReq.getTempCatQues(val).subscribe(success=>{

		  this.questionsList = success['data'];

      const len = this.questionsList.length;
      const mid = len / 2;

      this.questLeftList  = this.questionsList.slice(0, mid);
      this.questRghtList  = this.questionsList.slice(mid, len);

      this.httpReq.getTempCatAns(val).subscribe(success=>{

        this.quesAnswerList = success['data'];

      });
		});
	}

	getSurveyCategory(){

		this.httpReq.getCategories().subscribe(success=>{

		    this.surveyCatList = success['data'];
		});
	}

	getAnsType(){

		this.httpReq.getAnswerType().subscribe(success=>{

		    this.ansTypeList = (success['data']);
		});
	}

	getAnsAbbr(){

    this.ansAbbrList = [];
		this.httpReq.getAnswerAbbr().subscribe(success=>{

		    this.ansAbbrList = (success['data']);
		});
	}

	getAnsScale(val){

    this.ansScaleList = [];
    this.httpReq.getAnsAbbrScale(val).subscribe(success=>{

		    this.ansScaleList = (success['data']);

		    this.txt_dsg_ans_scale = this.ansScaleList[0]['ans_scale'];

		    this.getTempAnswers();

		});
	}

  getTempAnswers(){

    this.tempAnswersList.length = 0;
    this.txt_answers = [];

    this.httpReq.getScaleAns(this.txt_dsg_ans_scale, this.txt_dsg_ans_abbr).subscribe(success=>{

      this.answersList     = success['data'];

      for(var i=0; i<this.answersList.length; i++)
      {
        const temp = {
                       'id': i+1,
                       'answer': this.answersList[i]['answer']
                    };

        this.txt_answers[i] = this.answersList[i]['answer'];

        this.txt_rbtn[i];

        this.tempAnswersList.push(temp);
      }

    });
  }

	addField(){

		const temp = {
		                'id': (this.tempAnswersList.length+1),
		                'answer': ''
		              };

		this.tempAnswersList.push(temp);

		for(var i=0; i<this.tempAnswersList.length; i++)
		{
		  this.txt_answers[i] = this.tempAnswersList[i]['answer'];
		}
	}

	removeField(val: number){

		if(this.tempAnswersList.length > 1)
		{
		  this.txt_answers = [];

		  let foo_object = this.tempAnswersList[val]; // Item to remove
		  this.tempAnswersList = this.tempAnswersList.filter(obj => obj !== foo_object);

		  for(var i=0; i<this.tempAnswersList.length; i++)
		  {
		    this.txt_answers[i] = this.tempAnswersList[i]['answer'];
		  }
		}
		else
		{
		  this.evtEmit.toastErrMsg('Cannot remove...');
		}
	}

  addMatColField(){

    const temp = {
                    'id': (this.tempColAnsList.length+1),
                    'answer': ''
                  };

    this.tempColAnsList.push(temp);

    for(var i=0; i<this.tempColAnsList.length; i++)
    {
      this.txt_col_answers[i] = this.tempColAnsList[i]['answer'];
    }
  }

  removeMatColField(val: number){

    if(this.tempColAnsList.length > 1)
    {
      this.txt_col_answers = [];

      let foo_object = this.tempColAnsList[val]; // Item to remove
      this.tempColAnsList = this.tempColAnsList.filter(obj => obj !== foo_object);

      for(var i=0; i<this.tempColAnsList.length; i++)
      {
        this.txt_col_answers[i] = this.tempColAnsList[i]['answer'];
      }
    }
    else
    {
      this.evtEmit.toastErrMsg('Cannot remove...');
    }
  }

	assignAnswer(val: number){

		this.tempAnswersList[val]['answer'] = this.txt_answers[val];
	}

  assignMatColAnswer(val: number){

    this.tempColAnsList[val]['answer'] = this.txt_col_answers[val];
  }

  assignCategory(val){

    this.txt_dsg_sur_cat = val;

    this.questionsList   = [];

    this.getSurCatQues(val);
  }

  assignMCategory(val: string){

    this.txt_dsg_sur_cat = val;

    this.questionsList = [];

    this.httpReq.getTempCatQues(val).subscribe(success=>{

      this.questionsList = success['data'];
    });
  }

  loadBarRating()
  {
    if(this.txt_dsg_ans_abbr  === 'Star')
    {
      this.barType = 'stars';
    }
    if(this.txt_dsg_ans_abbr  === 'Horizontal')
    {
      this.barType = 'horizontal';
    }
    if(this.txt_dsg_ans_abbr  === 'Square')
    {
      this.barType = 'square';
    }
    if(this.txt_dsg_ans_abbr  === 'Movie')
    {
      this.barType = 'movie';
    }
  }

  assignAnsType(val, ques){
    //if(!this.evtEmit.validateMsg(ques))
    if(ques.indexOf('\'') >= 0 && ques.indexOf('"') >= 0)
    {
      this.evtEmit.toastErrMsg("Enter question without Single quotes(apostrophe) and double quotes");
      return;
    }
    this.clear();
    this.isSaveBtnHidden   = false;
    this.txt_dsg_ans_abbr  = 'Select Type';
    this.txt_dsg_sur_ques  = ques;
    this.txt_dsg_ans_type  = val;

    if(val === 'Multiple Choice')
    {
      this.isAnsListHidden    = false;
      this.isAnsAbbrHidden    = false;

      for(var i=0; i<3; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.txt_rbtn[i];

        this.tempAnswersList.push(temp);
      }

      this.getAnsAbbr();
    }

    if(val === 'Checkboxes')
    {
      this.isChkListHidden    = false;
      this.isAnsAbbrHidden    = false;

      for(var i=0; i<3; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.txt_rbtn[i];

        this.tempAnswersList.push(temp);
      }

      this.getAnsAbbr();
    }

    if(val === 'Dropdown')
    {
      this.isDropDwnHidden    = false;
      this.isAnsAbbrHidden    = false;

      for(var i=0; i<3; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.txt_rbtn[i];

        this.tempAnswersList.push(temp);
      }

      this.getAnsAbbr();
    }

    if(val === 'Comment Box')
    {
      this.isCommentHidden    = false;
    }

    if(val === 'Single Textbox')
    {
      this.isSingleTextHidden = false;
    }

    if(val === 'Contact Information')
    {
      this.isContactHidden    = false;

      this.httpReq.getContactInfo().subscribe(success=>{

        this.contactList = success['data'];

        for(var i=0; i<this.contactList.length; i++)
        {
          this.txt_contact_lbl[i] = this.contactList[i]['contact_info_col'];

          this.ckb_contact_lbl[i] = true;
        }
      });
    }

    if(val === 'Slider')
    {
      this.isSlider  = false;
    }

    if(val === 'Date / Time')
    {
      this.isDatePickerHidden = false;

      const temp = {
                     'id': 1,
                     'answer': 'Date / Time'
                  };

      this.txt_answers[0] = 'Date / Time';

      this.tempAnswersList.push(temp);
    }

    if(val === 'Star Rating')
    {
      this.isstarHidden       = false;
      this.isAnsAbbrHidden    = false;
      this.isAnsScaleHidden   = false;

      let starScale = [];

      let starAnsAbbr = [
                            {'answer_abbr': 'Star'}
                        ];

      /*let starAnsAbbr = [
                            {'answer_abbr': 'Star'},
                            {'answer_abbr': 'Horizontal'},
                            {'answer_abbr': 'Square'},
                            {'answer_abbr': 'Movie'}
                        ];*/

      this.ansAbbrList = starAnsAbbr;

      for(var i=2; i<11; i++)
      {
        const temp = {'ans_scale': i};

        starScale.push(temp);
      }

      this.ansScaleList = starScale;

      if(this.txt_dsg_sur_cid != '')
      {

      }
      else
      {

        this.txt_dsg_ans_abbr  = 'Star';

        this.txt_dsg_ans_scale = '5';
      }

      this.loadBarRating();
    }

    if(val === 'Multiple Textboxes')
    {
      this.isXTextHidden      = false;

      for(var i=0; i<3; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.tempAnswersList.push(temp);
      }

      this.getAnsAbbr();
    }

    if (val === 'File Upload'){

      this.isFileUploadHidden = false;

      const temp = {
                    'id': 1,
                    'answer': 'File Upload'
                  }

      this.txt_answers[0] = 'File Upload';
      this.tempAnswersList.push(temp);
    }

    if(val === 'Ranking')
    {
      this.isRankingHidden = false;

      for(var i=0; i<3; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.tempAnswersList.push(temp);
      }

      //this.getAnsAbbr();
    }

    if (val == 'Matrix / Rating Scale')
    {
      this.isMatrixHidden = false;

      for (var i = 0; i < 3; i++)
      {
        const temp = {
                        'id': i+1,
                        'answer':''
                      };

        this.txt_answers[i]     = '';
        this.txt_col_answers[i] = '';

        this.tempAnswersList.push(temp);
        this.tempColAnsList.push(temp);
      }
    }
    if (val === 'Image Choice')
    {
      this.isImageChoiceHidden = false;

      for(var i = 0; i < 2; i++)
      {
        const temp = {
                        'id': i + 1,
                        'answer': '',
                        'file_path': '',
                        'files': '',
                        'preview': ''
                      };

        this.txt_answers[i]         = '';
        this.isImageUploadHidden[i] = false;
        this.selectedImage[i]       = 'undefined';
        this.uploadPreview[i]       = 'undefined';

        this.tempAnswersList.push(temp);
      }
    }

    if(val === 'Table')
    {
      this.isTable             = false;
      this.txt_row_count       = 3;
      this.txt_col_count       = 4;

      for(var i=0; i<4; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.tempAnswersList.push(temp);
      }
    }

    if(val === 'Answer Type')
    {
      this.clear();
    }
  }

  loadTabHeaders(){

    console.log(isNaN(this.txt_col_count))

    if(!isNaN(this.txt_col_count))
    {
      this.tempAnswersList = [];

      for(var i=0; i<this.txt_col_count; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.tempAnswersList.push(temp);
      }
    }
    else
    {
      this.evtEmit.toastErrMsg('Column should be numeric...');
    }
  }

  assignAnsAbbr(val){

    if(this.txt_dsg_ans_type != 'Star Rating')
    {
      if(val != 'Select Type')
      {
        this.getAnsScale(val);
        this.isAnsScaleHidden = false;
      }
      else
      {
        this.isAnsScaleHidden = true;
        this.tempAnswersList  = [];

        for(var i=0; i<3; i++)
        {
          const temp = {
                             'id': i+1,
                             'answer': ''
                          };

          this.txt_answers[i] = '';

          this.txt_rbtn[i];

          this.tempAnswersList.push(temp);
        }
      }
    }
    else
    {
      this.loadBarRating()
      this.isAnsScaleHidden = false;
    }
  }

  assignAnsScale(val){

    if(this.txt_dsg_ans_type != 'Star Rating')
    {
      this.getTempAnswers();
    }
    else
    {
      this.barMaxLength = val;
    }
  }

  loadStarRating(val, val_1, val_2, val_3)
  {
    this.clear();
    this.isSaveBtnHidden    = false;
    this.isstarHidden       = false;
    this.isAnsAbbrHidden    = false;
    this.isAnsScaleHidden   = false;
    this.txt_dsg_sur_cid    = val;
    this.txt_dsg_sur_ques   = val_1;
    this.txt_dsg_ans_type   = val_2;
    this.edit_sl_no         = val_3;
    let starScale = [];

    let starAnsAbbr = [
                          {'answer_abbr': 'Star'}
                      ];

    this.ansAbbrList = starAnsAbbr;

    for(var i=2; i<11; i++)
    {
      const temp = {'ans_scale': i};

      starScale.push(temp);
    }

    this.ansScaleList = starScale;

    for(var i=0; i<this.addedQuesList.length; i++)
    {
      if(this.addedQuesList[i]['id'] === val)
      {
        this.txt_dsg_ans_abbr  = this.addedQuesList[i]['answer_sub_type'];

        this.txt_dsg_ans_scale = this.addedQuesList[i]['answer_scale'];

        this.loadBarRating();

        break;
      }
    }
  }

  loadStarLabels()
  {
    if(this.star_label_chk != false)
    {
      for(var i=0; i<this.barMaxLength; i++)
      {
        const temp = {
                           'id': i+1,
                           'answer': ''
                        };

        this.txt_answers[i] = '';

        this.txt_rbtn[i];

        this.tempAnswersList.push(temp);
      }
    }
    else
    {
      this.star_label_chk = false;
      this.tempAnswersList.length = 0;
    }
  }

  loadSlider(val)
  {
    this.clear();
    this.isSlider  = false;

    for(var i=0; i<this.addedQuesList.length; i++)
    {
      if(this.addedQuesList[i]['id'] === val)
      {
        this.txt_slider_step = this.addedQuesList[i]['answer_scale'];

        break;
      }
    }
  }

  clear(){

    this.txt_dsg_sur_ques  = '';
    this.txt_dsg_ans_type  = 'Answer Type';
    this.txt_dsg_sur_cid   = '';
    this.ansAbbrList       = [];
    this.ansScaleList      = [];
    this.answersList       = '';
    this.tempAnswersList   = [];
    this.contactList       = [];
    this.txt_contact_lbl   = [];
    this.isAnsAbbrHidden   = true;
    this.isAnsScaleHidden  = true;
    this.isSaveBtnHidden   = true;
    this.isAnsListHidden   = true;
    this.isCommentHidden   = true;
    this.isChkListHidden   = true;
    this.isSingleTextHidden = true;
    this.isContactHidden    = true;
    this.isDropDwnHidden    = true;
    this.isContactHidden    = true;
    this.isstarHidden       = true;
    this.isSlider           = true;
    this.isDatePickerHidden = true;
    this.isXTextHidden      = true;
    this.isFileUploadHidden = true;
    this.isRankingHidden    = true;
    this.txt_slider_max      = 100;
    this.txt_slider_min      = 0;
    this.txt_slider_step     = 1;
    this.rbtn_date_format    = '';
    this.ckb_time_info       = true;
    this.ckb_date_info       = true;
    this.txt_date_message    = 'Please enter a valid date.';
    this.ckb_pdf_info        = true;
    this.ckb_doc_info        = true;
    this.ckb_png_info        = true;
    this.ckb_jpg_info        = true;
    this.ckb_gif_info        = true;
    this.txt_file_message    = 'Only PDF, DOC, DOCX, PNG, JPG, JPEG, GIF files are suported.'

    this.addedAnswerList     =  '';
    this.isMatrixHidden      = true;
    this.txt_col_answers     = [];
    this.tempColAnsList      = [];
    this.isImageChoiceHidden = true;
    this.isImageUploadHidden = [];
    this.selectedImage       = [];
    this.uploadPreview       = [];
    this.isTable             = true;
    this.txt_row_count       = 0;
    this.txt_col_count       = 0;
    this.txt_dsg_assign_grp  = 'Select Group';
    this.ckb_ques_val        = false;
    this.contactList.length = 0;
    this.childInsData.length = 0;
    this.getAddedQues();
  }

  addImgField(){

    const temp = {
                    'id': (this.tempAnswersList.length+1),
                    'answer': '',
                    'file_path': '',
                    'files': '',
                    'preview': ''
                  };

    this.tempAnswersList.push(temp);

    //console.log(JSON.stringify(this.tempAnswersList));

    for(var i=0; i<this.tempAnswersList.length; i++)
    {
      this.txt_answers[i]   = this.tempAnswersList[i]['answer'];
      this.selectedImage[i] = this.tempAnswersList[i]['files'];
      this.uploadPreview[i] = this.tempAnswersList[i]['preview'];
    }
  }

  removeImgField(val)
  {
    if(this.tempAnswersList.length > 1)
    {
      this.txt_answers   = [];
      this.uploadPreview = [];
      this.selectedImage = [];

      let foo_object = this.tempAnswersList[val]; // Item to remove
      this.tempAnswersList = this.tempAnswersList.filter(obj => obj !== foo_object);

      for(var i=0; i<this.tempAnswersList.length; i++)
      {
        this.txt_answers[i] = this.tempAnswersList[i]['answer'];
        this.selectedImage[i] = this.tempAnswersList[i]['files'];
        this.uploadPreview[i] = this.tempAnswersList[i]['preview'];
      }
    }
    else
    {
      this.evtEmit.toastErrMsg('Cannot remove...');
    }
  }

  assignImgAnswer(val: number){

    this.tempAnswersList[val]['answer'] = this.txt_answers[val];
  }


  preview(index)
  {
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage[index]);
    this.tempAnswersList[index]['files'] = this.selectedImage[index];
    reader.onload = (_event) => {
      this.uploadPreview[index] = reader.result;
      this.tempAnswersList[index]['preview'] = this.uploadPreview[index];
    }
  }

  onUploadImageChanged(event, index)
  {
    const file              = event.target.files[0].name.toLowerCase();
    //this.txt_answers[index] = event.target.files[0].name;
    const extension         = file.substring(file.lastIndexOf('.') + 1);

    if(extension === "png" || extension === "jpg")
    {
      this.new_index              = index;
      this.selectedImage[index]   = event.target.files[0];
      var reader                  = new FileReader();
      reader.onload               = this._handleReaderLoaded.bind(this);
      this.preview(index);
      reader.readAsBinaryString(this.selectedImage[index]);
    }
    else
    {
      this.evtEmit.toastErrMsg('Only images are supported...');
    }
  }

  createSurQues(){

    //console.log(this.txt_dsg_sur_cid);

    if(this.txt_dsg_sur_cid != '')
    {
      this.isShwSpinner   = false;

      if(this.txt_dsg_sur_ques.length >0 )
      {
        if(this.addedQuesList.length >= this.txt_dsg_ques_limit)
        {
          this.evtEmit.toastErrMsg('We recommed maximum 5 questions in a survey to ensure optimal response');
        }

        if(this.txt_dsg_ans_type === 'Multiple Choice' || this.txt_dsg_ans_type === 'Checkboxes' || this.txt_dsg_ans_type === 'Dropdown' || this.txt_dsg_ans_type === 'Multiple Textboxes' || this.txt_dsg_ans_type === 'Ranking')
        {
          if(this.tempAnswersList.length > 0)
          {
            this.childInsData = [];

            for(var i=0; i<this.tempAnswersList.length; i++)
            {
              //console.log(this.txt_answers[i]);

              if(this.txt_answers[i].length <= 0)
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Enter answer to continue...');

                return;
              }

              const child_data = {
                                  'survey_id':  this.txt_dsg_sur_id,
                                  'survey_q_id': '',
                                  'answer': this.txt_answers[i]
                                };

              this.childInsData.push(child_data);
            }

            //console.log(JSON.stringify(this.childInsData));

            if(this.childInsData.length > 0)
            {
              this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                {
                  this.deleteSurQues(this.txt_dsg_sur_cid);

                  let grp_name;

                  if(this.txt_dsg_assign_grp != 'Select Group')
                  {
                    grp_name = this.txt_dsg_assign_grp;
                  }
                  else
                  {
                    grp_name = '-';
                  }

                  const in_data = {
                                    'survey_id': this.txt_dsg_sur_id,
                                    'question': this.txt_dsg_sur_ques,
                                    'answer_type': this.txt_dsg_ans_type,
                                    'answer_sub_type': this.txt_dsg_ans_abbr,
                                    'answer_scale': this.txt_dsg_ans_scale,
                                    'sl_no': this.edit_sl_no,
                                    'question_section_name': grp_name,
                                    'mandatory': this.ckb_ques_val
                                  };

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    const sur_cid = success['data']['id'];

                    for(var i=0; i<this.childInsData.length; i++)
                    {
                        this.childInsData[i]['survey_q_id'] = sur_cid;
                    }

                    const cin_data = {'survey_answers': this.childInsData};

                    //console.log(JSON.stringify(cin_data));

                    this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                      this.isShwSpinner   = true;

                      this.clear();

                    });

                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }
              });
            }
          }
          else
          {
            this.isShwSpinner   = true;
            this.evtEmit.toastErrMsg('Select answer type to continue...');
          }
        }
        if(this.txt_dsg_ans_type === 'Star Rating')
        {
          if(this.txt_dsg_ans_abbr != 'Select Type' && this.txt_dsg_ans_scale != 'Select Scale')
          {
            if(this.star_label_chk != false)
            {
              if(this.tempAnswersList.length > 0)
              {
                this.childInsData = [];

                for(var i=0; i<this.tempAnswersList.length; i++)
                {
                  if(this.txt_answers[i].length <= 0)
                  {
                    this.isShwSpinner   = true;

                    this.evtEmit.toastErrMsg('Enter answer to continue...');

                    return;
                  }

                  const child_data = {
                                      'survey_id':  this.txt_dsg_sur_id,
                                      'survey_q_id': '',
                                      'answer': this.txt_answers[i]
                                    };

                  this.childInsData.push(child_data);
                }

                if(this.addedAnswerList.length > 0)
                {
                  this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                    const result = success['data'][0];

                    if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                    {
                      this.deleteSurQues(this.txt_dsg_sur_cid);

                      let grp_name;

                      if(this.txt_dsg_assign_grp != 'Select Group')
                      {
                        grp_name = this.txt_dsg_assign_grp;
                      }
                      else
                      {
                        grp_name = '-';
                      }

                      const in_data = {
                                        'survey_id': this.txt_dsg_sur_id,
                                        'question': this.txt_dsg_sur_ques,
                                        'answer_type': this.txt_dsg_ans_type,
                                        'answer_sub_type': this.txt_dsg_ans_abbr,
                                        'answer_scale': this.txt_dsg_ans_scale,
                                        'sl_no': this.edit_sl_no,
                                        'question_section_name': grp_name,
                                        'mandatory': this.ckb_ques_val
                                      };

                      this.httpReq.postSurQues(in_data).subscribe(success=>{

                        const sur_cid = success['data']['id'];

                        for(var i=0; i<this.childInsData.length; i++)
                        {
                            this.childInsData[i]['survey_q_id'] = sur_cid;
                        }

                        const cin_data = {'survey_answers': this.childInsData};

                        this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                          this.isShwSpinner   = true;

                          this.clear();

                        });

                      });
                    }
                    else
                    {
                      this.isShwSpinner   = true;

                      this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                    }

                  });
                }
                else
                {
                  let grp_name;

                  if(this.txt_dsg_assign_grp != 'Select Group')
                  {
                    grp_name = this.txt_dsg_assign_grp;
                  }
                  else
                  {
                    grp_name = '-';
                  }

                  const in_data = {
                                  'survey_id': this.txt_dsg_sur_id,
                                  'question': this.txt_dsg_sur_ques,
                                  'answer_type': this.txt_dsg_ans_type,
                                  'answer_sub_type': this.txt_dsg_ans_abbr,
                                  'answer_scale': this.txt_dsg_ans_scale,
                                  'sl_no': this.edit_sl_no,
                                  'question_section_name': grp_name,
                                  'mandatory': this.ckb_ques_val
                                };

                  this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                    const result = success['data'][0];

                    if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                    {

                      this.deleteSurQues(this.txt_dsg_sur_cid);

                      this.httpReq.postSurQues(in_data).subscribe(success=>{

                        const sur_cid = success['data']['id'];

                        for(var i=0; i<this.childInsData.length; i++)
                        {
                            this.childInsData[i]['survey_q_id'] = sur_cid;
                        }

                        const cin_data = {'survey_answers': this.childInsData};

                        this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                          this.isShwSpinner   = true;

                          this.clear();

                        });

                      });
                    }
                    else
                    {
                      this.isShwSpinner   = true;

                      this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                    }

                  });
                }
              }
            }
            else
            {
              let grp_name;

              if(this.txt_dsg_assign_grp != 'Select Group')
              {
                grp_name = this.txt_dsg_assign_grp;
              }
              else
              {
                grp_name = '-';
              }

              const in_data = {
                                'survey_id': this.txt_dsg_sur_id,
                                'question': this.txt_dsg_sur_ques,
                                'answer_type': this.txt_dsg_ans_type,
                                'answer_sub_type': this.txt_dsg_ans_abbr,
                                'answer_scale': this.txt_dsg_ans_scale,
                                'sl_no': this.edit_sl_no,
                                'question_section_name': grp_name,
                                'mandatory': this.ckb_ques_val
                              };

              this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                {
                  this.deleteSurQues(this.txt_dsg_sur_cid);

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }

              });
            }
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Select type and scale continue...');
          }
        }

        if(this.txt_dsg_ans_type === 'Slider')
        {
          if((!Number.isNaN(Number(this.txt_slider_min)))
          && (!Number.isNaN(Number(this.txt_slider_max)))
          && (!Number.isNaN(Number(this.txt_slider_step)) && this.txt_slider_step > 0))
          {
            this.childInsData = [];

            const temp = {
                            'survey_id':  this.txt_dsg_sur_id,
                            'survey_q_id': '',
                            'first_value': this.txt_slider_min,
                            'last_value': this.txt_slider_max
                          };

            this.childInsData.push(temp);

            this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

              const result = success['data'][0];

              if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
              {
                this.deleteSurQues(this.txt_dsg_sur_cid);

                let grp_name;

                if(this.txt_dsg_assign_grp != 'Select Group')
                {
                  grp_name = this.txt_dsg_assign_grp;
                }
                else
                {
                  grp_name = '-';
                }

                const in_data = {
                                  'survey_id': this.txt_dsg_sur_id,
                                  'question': this.txt_dsg_sur_ques,
                                  'answer_type': this.txt_dsg_ans_type,
                                  'answer_sub_type': '-',
                                  'answer_scale': this.txt_slider_step,
                                  'sl_no': this.edit_sl_no,
                                  'question_section_name': grp_name,
                                  'mandatory': this.ckb_ques_val
                                };

                this.httpReq.postSurQues(in_data).subscribe(success=>{

                  const sur_cid = success['data']['id'];

                  for(var i=0; i<this.childInsData.length; i++)
                  {
                      this.childInsData[i]['survey_q_id'] = sur_cid;
                  }

                  const cin_data = {'survey_answers': this.childInsData};

                  this.httpReq.postAnsSlider(cin_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });
                });
              }
              else
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Select answer type to continue...');
              }
            });
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Enter numeric value in scale range and step size to continue...');
          }
        }

        if(this.txt_dsg_ans_type === 'Comment Box' || this.txt_dsg_ans_type === 'Single Textbox')
        {
          this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

            const result = success['data'][0];

            if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
            {
              this.deleteSurQues(this.txt_dsg_sur_cid);

              let grp_name;

              if(this.txt_dsg_assign_grp != 'Select Group')
              {
                grp_name = this.txt_dsg_assign_grp;
              }
              else
              {
                grp_name = '-';
              }

              const in_data = {
                                'survey_id': this.txt_dsg_sur_id,
                                'question': this.txt_dsg_sur_ques,
                                'answer_type': this.txt_dsg_ans_type,
                                'sl_no': this.edit_sl_no,
                                'question_section_name': grp_name,
                                'mandatory': this.ckb_ques_val
                              };

              this.httpReq.postSurQues(in_data).subscribe(success=>{

                const sur_cid = success['data']['id'];

                this.isShwSpinner   = true;

                this.clear();

              });
            }
            else
            {
              this.isShwSpinner   = true;

              this.evtEmit.toastErrMsg('Duplicate question and answer type...');
            }
          });
        }

        if(this.txt_dsg_ans_type === 'Contact Information')
        {
          this.childInsData = [];

          for(var i=0; i<this.contactList.length; i++)
          {
            if(this.ckb_contact_lbl[i] === true)
            {
              const child_data = {
                                    'survey_id':  this.txt_dsg_sur_id,
                                    'survey_q_id': '',
                                    'contact_info_type': this.contactList[i]['contact_info_col'],
                                    'contact_info_label': this.txt_contact_lbl[i]
                                  };

              this.childInsData.push(child_data);
            }
          }

          this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

            const result = success['data'][0];

            if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
            {
                this.deleteSurQues(this.txt_dsg_sur_cid);

                let grp_name;

                if(this.txt_dsg_assign_grp != 'Select Group')
                {
                  grp_name = this.txt_dsg_assign_grp;
                }
                else
                {
                  grp_name = '-';
                }

                const in_data = {
                                    'survey_id': this.txt_dsg_sur_id,
                                    'question': this.txt_dsg_sur_ques,
                                    'answer_type': this.txt_dsg_ans_type,
                                    'sl_no': this.edit_sl_no,
                                    'question_section_name': grp_name,
                                    'mandatory': this.ckb_ques_val
                                  };

                this.httpReq.postSurQues(in_data).subscribe(success=>{

                  const sur_cid = success['data']['id'];

                  for(var i=0; i<this.childInsData.length; i++)
                  {
                      this.childInsData[i]['survey_q_id'] = sur_cid;
                  }

                  const cin_data = {'survey_contact': this.childInsData};

                  this.httpReq.postAnsContactInfo(cin_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });

                });
            }
            else
            {
              this.isShwSpinner   = true;

              this.evtEmit.toastErrMsg('Duplicate question and answer type...');
            }
          });
        }

        if(this.txt_dsg_ans_type === 'Date / Time')
        {
          if(this.ckb_date_info && this.rbtn_date_format.length > 0)
          {
            if(this.tempAnswersList.length > 0)
            {
              this.childInsData = [];

              for(var i=0; i<this.tempAnswersList.length; i++)
              {
                if(this.txt_answers[i].length <= 0)
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Enter date label to continue...');

                  return;
                }

                const child_data = {
                                    'survey_id':  this.txt_dsg_sur_id,
                                    'survey_q_id': '',
                                    'display_label': this.txt_answers[i],
                                    'date_info': this.ckb_date_info,
                                    'time_info': this.ckb_time_info,
                                    'error_message': this.txt_date_message,
                                    'date_format': this.rbtn_date_format
                                  };

                this.childInsData.push(child_data);
              }

              if(this.childInsData.length > 0)
              {
                this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                  const result = success['data'][0];

                  if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                  {
                    this.deleteSurQues(this.txt_dsg_sur_cid);

                    let grp_name;

                    if(this.txt_dsg_assign_grp != 'Select Group')
                    {
                      grp_name = this.txt_dsg_assign_grp;
                    }
                    else
                    {
                      grp_name = '-';
                    }

                    const in_data = {
                                    'survey_id': this.txt_dsg_sur_id,
                                    'question': this.txt_dsg_sur_ques,
                                    'answer_type': this.txt_dsg_ans_type,
                                    'sl_no': this.edit_sl_no,
                                    'question_section_name': grp_name,
                                    'mandatory': this.ckb_ques_val
                                  };

                   this.httpReq.postSurQues(in_data).subscribe(success=>{

                      const sur_cid = success['data']['id'];

                      for(var i=0; i<this.childInsData.length; i++)
                      {
                          this.childInsData[i]['survey_q_id'] = sur_cid;
                      }

                      const cin_data = {'survey_answers': this.childInsData};

                      this.httpReq.postAnsDateInfo(cin_data).subscribe(success=>{

                        this.isShwSpinner   = true;

                        this.clear();

                      });

                    });
                  }
                  else
                  {
                    this.isShwSpinner   = true;

                    this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                  }
                });
              }
            }
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Check date info and select date format to continue...');

          }

        }
        if(this.txt_dsg_ans_type === 'File Upload')
        {
          if(this.tempAnswersList.length > 0)
          {
            this.childInsData = [];

            for(var i = 0; i < this.tempAnswersList.length; i++)
            {
              const child_data = {
                                  'survey_id':  this.txt_dsg_sur_id,
                                  'survey_q_id': '',
                                  'instruction': this.inst_file,
                                  'pdf': this.ckb_pdf_info,
                                  'doc_docx': this.ckb_doc_info,
                                  'png': this.ckb_png_info,
                                  'jpg_jpeg': this.ckb_jpg_info,
                                  'gif': this.ckb_gif_info,
                                  'error_message': this.txt_file_message
                                };
              this.childInsData.push(child_data);
            }

            if(this.childInsData.length > 0)
            {
              this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                {
                  this.deleteSurQues(this.txt_dsg_sur_cid);

                  let grp_name;

                  if(this.txt_dsg_assign_grp != 'Select Group')
                  {
                    grp_name = this.txt_dsg_assign_grp;
                  }
                  else
                  {
                    grp_name = '-';
                  }

                  const in_data = {
                                  'survey_id': this.txt_dsg_sur_id,
                                  'question': this.txt_dsg_sur_ques,
                                  'answer_type': this.txt_dsg_ans_type,
                                  'sl_no': this.edit_sl_no,
                                  'question_section_name': grp_name,
                                  'mandatory': this.ckb_ques_val
                                };

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    const sur_cid = success['data']['id'];

                    for(var i=0; i<this.childInsData.length; i++)
                    {
                        this.childInsData[i]['survey_q_id'] = sur_cid;
                    }

                    const cin_data = {'survey_answers': this.childInsData};

                    this.httpReq.postAnsFileUpInfo(cin_data).subscribe(success=>{

                      this.isShwSpinner   = true;

                      this.clear();

                    });

                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }
              });
            }
          }
        }

        if (this.txt_dsg_ans_type === 'Matrix / Rating Scale')
        {
          if (this.tempAnswersList.length > 0)
          {
            this.childInsData    = [];

            for (var i = 0; i < this.tempAnswersList.length; i++)
            {
              if (this.txt_answers[i].length <= 0)
              {
                this.isShwSpinner = true;

                this.evtEmit.toastErrMsg('Enter row label to continue...');
                return;
              }

              const child_data = {
                                  'survey_id': this.txt_dsg_sur_id,
                                  'survey_q_id': '',
                                  'matrix_type': 'row',
                                  'matrix_ans_type': this.txt_dsg_ans_type,
                                  'matrix_value': this.txt_answers[i]
                                };

              this.childInsData.push(child_data);
            }

            for (var k = 0; k < this.tempColAnsList.length; k++)
            {
              if (this.txt_col_answers[k].length <= 0)
              {
                this.isShwSpinner = true;

                this.evtEmit.toastErrMsg('Enter column label to continue...');
                return;
              }

              const child_col_data = {
                                      'survey_id': this.txt_dsg_sur_id,
                                      'survey_q_id': '',
                                      'matrix_type': 'column',
                                      'matrix_ans_type': this.txt_dsg_ans_type,
                                      'matrix_value': this.txt_col_answers[k]
                                    };

              this.childInsData.push(child_col_data);
            }

            let grp_name;

            if(this.txt_dsg_assign_grp != 'Select Group')
            {
              grp_name = this.txt_dsg_assign_grp;
            }
            else
            {
              grp_name = '-';
            }

            const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

            this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

              const result = success['data'][0];

              if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
              {
                this.deleteSurQues(this.txt_dsg_sur_cid);

                this.httpReq.postSurQues(in_data).subscribe(success=>{

                  const sur_cid = success['data']['id'];

                  for(var i=0; i<this.childInsData.length; i++)
                  {
                      this.childInsData[i]['survey_q_id'] = sur_cid;
                  }

                  const cin_data = {'survey_answers': this.childInsData};

                  this.httpReq.postAnsMatrix(cin_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });

                });
              }
              else
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Duplicate question and answer type...');
              }
            });
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Enter row and column labels to  continue...');
          }
        }

        if(this.txt_dsg_ans_type === 'Table')
        {
          if((!isNaN(this.txt_row_count) && this.txt_row_count >0) && (!isNaN(this.txt_col_count) && this.txt_col_count >0))
          {
            if(this.tempAnswersList.length > 0)
            {
              this.childInsData = [];

              for(var i=0; i<this.tempAnswersList.length; i++)
              {
                if(this.txt_answers[i].length <= 0)
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Enter answer to continue...');

                  return;
                }

                const child_data = {
                                    'survey_id':  this.txt_dsg_sur_id,
                                    'survey_q_id': '',
                                    'answer': this.txt_answers[i]
                                  };

                this.childInsData.push(child_data);
              }
              this.httpReq.chkEditQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type, this.txt_dsg_sur_cid).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s_edit'] != 'Duplicate question and answer type')
                {
                  this.deleteSurQues(this.txt_dsg_sur_cid);

                  let grp_name;

                  if(this.txt_dsg_assign_grp != 'Select Group')
                  {
                    grp_name = this.txt_dsg_assign_grp;
                  }
                  else
                  {
                    grp_name = '-';
                  }

                  const in_data = {
                                    'survey_id': this.txt_dsg_sur_id,
                                    'question': this.txt_dsg_sur_ques,
                                    'answer_type': this.txt_dsg_ans_type,
                                    'answer_sub_type': this.txt_row_count,
                                    'answer_scale': this.txt_col_count,
                                    'sl_no': this.edit_sl_no,
                                    'question_section_name': grp_name,
                                    'mandatory': this.ckb_ques_val
                                  };

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    const sur_cid = success['data']['id'];

                    for(var i=0; i<this.childInsData.length; i++)
                    {
                        this.childInsData[i]['survey_q_id'] = sur_cid;
                    }

                    const cin_data = {'survey_answers': this.childInsData};

                    this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                      this.isShwSpinner   = true;

                      this.clear();

                    });

                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }

              });
            }
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Select type and scale continue...');
          }
        }
      }
      else
      {
        this.isShwSpinner   = true;

        this.evtEmit.toastErrMsg('Question is mandatory...');
      }

    }
    else
    {
      this.isShwSpinner   = false;

      if(this.txt_dsg_sur_ques.length >0 )
      {
        if(this.addedQuesList.length >= this.txt_dsg_ques_limit)
        {
          this.evtEmit.toastErrMsg('We recommed maximum 5 questions in a survey to ensure optimal response');
        }

        if(this.txt_dsg_ans_type === 'Multiple Choice' || this.txt_dsg_ans_type === 'Checkboxes' || this.txt_dsg_ans_type === 'Dropdown' || this.txt_dsg_ans_type === 'Multiple Textboxes' || this.txt_dsg_ans_type === 'Ranking')
        {
          if(this.tempAnswersList.length > 0)
          {
            this.childInsData = [];

            for(var i=0; i<this.tempAnswersList.length; i++)
            {
              if(this.txt_answers[i].length <= 0)
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Enter answer to continue...');

                return;
              }

              const child_data = {
                                  'survey_id':  this.txt_dsg_sur_id,
                                  'survey_q_id': '',
                                  'answer': this.txt_answers[i]
                                };

              this.childInsData.push(child_data);
            }

            let grp_name;

            if(this.txt_dsg_assign_grp != 'Select Group')
            {
              grp_name = this.txt_dsg_assign_grp;
            }
            else
            {
              grp_name = '-';
            }

            const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'sl_no': (this.addedQuesList.length + 1),
                              'answer_sub_type': this.txt_dsg_ans_abbr,
                              'answer_scale': this.txt_dsg_ans_scale,
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

            this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

              const result = success['data'][0];

              if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
              {

                this.httpReq.postSurQues(in_data).subscribe(success=>{

                  const sur_cid = success['data']['id'];

                  for(var i=0; i<this.childInsData.length; i++)
                  {
                      this.childInsData[i]['survey_q_id'] = sur_cid;
                  }

                  const cin_data = {'survey_answers': this.childInsData};

                  this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });

                });
              }
              else
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Duplicate question and answer type...');
              }

            });
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Select answer type to continue...');
          }
        }
        if(this.txt_dsg_ans_type === 'Comment Box' || this.txt_dsg_ans_type === 'Single Textbox')
        {
          let grp_name;

          if(this.txt_dsg_assign_grp != 'Select Group')
          {
            grp_name = this.txt_dsg_assign_grp;
          }
          else
          {
            grp_name = '-';
          }

          const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'sl_no': (this.addedQuesList.length + 1),
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

          this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

            const result = success['data'][0];

            if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
            {

              this.httpReq.postSurQues(in_data).subscribe(success=>{

                const sur_cid = success['data']['id'];

                this.isShwSpinner   = true;

                this.clear();

              });
            }
            else
            {
              this.isShwSpinner   = true;

              this.evtEmit.toastErrMsg('Duplicate question and answer type...');
            }
          });
        }
        if(this.txt_dsg_ans_type === 'Contact Information')
        {
          for(var i=0; i<this.contactList.length; i++)
          {
            if(this.ckb_contact_lbl[i] === true)
            {
              const child_data = {
                                    'survey_id':  this.txt_dsg_sur_id,
                                    'survey_q_id': '',
                                    'contact_info_type': this.contactList[i]['contact_info_col'],
                                    'contact_info_label': this.txt_contact_lbl[i]
                                  };

              this.childInsData.push(child_data);
            }
          }

          let grp_name;

          if(this.txt_dsg_assign_grp != 'Select Group')
          {
            grp_name = this.txt_dsg_assign_grp;
          }
          else
          {
            grp_name = '-';
          }

          const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'sl_no': (this.addedQuesList.length + 1),
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

          this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

            const result = success['data'][0];

            if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
            {
              this.httpReq.postSurQues(in_data).subscribe(success=>{

                const sur_cid = success['data']['id'];

                for(var i=0; i<this.childInsData.length; i++)
                {
                    this.childInsData[i]['survey_q_id'] = sur_cid;
                }

                const cin_data = {'survey_contact': this.childInsData};

                this.httpReq.postAnsContactInfo(cin_data).subscribe(success=>{

                  this.isShwSpinner   = true;

                  this.clear();
                });

              });
            }
            else
            {
              this.isShwSpinner   = true;

              this.evtEmit.toastErrMsg('Duplicate question and answer type...');
            }
          });
        }
        if(this.txt_dsg_ans_type === 'Star Rating')
        {
          if(this.txt_dsg_ans_abbr != 'Select Type' && this.txt_dsg_ans_scale != 'Select Scale')
          {
            if(this.star_label_chk != false)
            {
              if(this.tempAnswersList.length > 0)
              {
                this.childInsData = [];

                for(var i=0; i<this.tempAnswersList.length; i++)
                {
                  if(this.txt_answers[i].length <= 0)
                  {
                    this.isShwSpinner   = true;

                    this.evtEmit.toastErrMsg('Enter answer to continue...');

                    return;
                  }

                  const child_data = {
                                      'survey_id':  this.txt_dsg_sur_id,
                                      'survey_q_id': '',
                                      'answer': this.txt_answers[i]
                                    };

                  this.childInsData.push(child_data);
                }

                let grp_name;

                if(this.txt_dsg_assign_grp != 'Select Group')
                {
                  grp_name = this.txt_dsg_assign_grp;
                }
                else
                {
                  grp_name = '-';
                }

                const in_data = {
                                  'survey_id': this.txt_dsg_sur_id,
                                  'question': this.txt_dsg_sur_ques,
                                  'answer_type': this.txt_dsg_ans_type,
                                  'answer_sub_type': this.txt_dsg_ans_abbr,
                                  'answer_scale': this.txt_dsg_ans_scale,
                                  'sl_no': (this.addedQuesList.length + 1),
                                  'question_section_name': grp_name,
                                  'mandatory': this.ckb_ques_val
                                };

                this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

                  const result = success['data'][0];

                  if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
                  {

                    this.httpReq.postSurQues(in_data).subscribe(success=>{

                      const sur_cid = success['data']['id'];

                      for(var i=0; i<this.childInsData.length; i++)
                      {
                          this.childInsData[i]['survey_q_id'] = sur_cid;
                      }

                      const cin_data = {'survey_answers': this.childInsData};

                      this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                        this.isShwSpinner   = true;

                        this.clear();

                      });

                    });
                  }
                  else
                  {
                    this.isShwSpinner   = true;

                    this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                  }

                });
              }
            }
            else
            {
              let grp_name;

              if(this.txt_dsg_assign_grp != 'Select Group')
              {
                grp_name = this.txt_dsg_assign_grp;
              }
              else
              {
                grp_name = '-';
              }

              const in_data = {
                                'survey_id': this.txt_dsg_sur_id,
                                'question': this.txt_dsg_sur_ques,
                                'answer_type': this.txt_dsg_ans_type,
                                'answer_sub_type': this.txt_dsg_ans_abbr,
                                'answer_scale': this.txt_dsg_ans_scale,
                                'sl_no': (this.addedQuesList.length + 1),
                                'question_section_name': grp_name,
                                'mandatory': this.ckb_ques_val
                              };

              this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
                {

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();
                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }

              });
            }
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Select type and scale continue...');
          }
        }
        if(this.txt_dsg_ans_type === 'Slider')
        {
          if((!Number.isNaN(Number(this.txt_slider_min)))
          && (!Number.isNaN(Number(this.txt_slider_max)))
          && (!Number.isNaN(Number(this.txt_slider_step)) && this.txt_slider_step > 0))
          {
            this.childInsData = [];

            const temp = {
                            'survey_id':  this.txt_dsg_sur_id,
                            'survey_q_id': '',
                            'first_value': this.txt_slider_min,
                            'last_value': this.txt_slider_max
                          };

            this.childInsData.push(temp);

            let grp_name;

            if(this.txt_dsg_assign_grp != 'Select Group')
            {
              grp_name = this.txt_dsg_assign_grp;
            }
            else
            {
              grp_name = '-';
            }

            const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'answer_sub_type': '-',
                              'answer_scale': this.txt_slider_step,
                              'sl_no': (this.addedQuesList.length + 1),
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

            this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

              const result = success['data'][0];

              if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
              {

                this.httpReq.postSurQues(in_data).subscribe(success=>{

                  const sur_cid = success['data']['id'];

                  for(var i=0; i<this.childInsData.length; i++)
                  {
                      this.childInsData[i]['survey_q_id'] = sur_cid;
                  }

                  const cin_data = {'survey_answers': this.childInsData};

                  this.httpReq.postAnsSlider(cin_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });

                });
              }
              else
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Duplicate question and answer type...');
              }

            });
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Enter numeric value in scale range and step size to continue...');
          }
        }
        if(this.txt_dsg_ans_type === 'Date / Time')
        {
          if(this.ckb_date_info && this.rbtn_date_format.length > 0)
          {
            if(this.tempAnswersList.length > 0)
            {
              this.childInsData = [];

              for(var i=0; i<this.tempAnswersList.length; i++)
              {
                if(this.txt_answers[i].length <= 0)
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Enter date label to continue...');

                  return;
                }

                const child_data = {
                                    'survey_id':  this.txt_dsg_sur_id,
                                    'survey_q_id': '',
                                    'display_label': this.txt_answers[i],
                                    'date_info': this.ckb_date_info,
                                    'time_info': this.ckb_time_info,
                                    'error_message': this.txt_date_message,
                                    'date_format': this.rbtn_date_format
                                  };

                this.childInsData.push(child_data);
              }

              if(this.childInsData.length > 0)
              {
                let grp_name;

                if(this.txt_dsg_assign_grp != 'Select Group')
                {
                  grp_name = this.txt_dsg_assign_grp;
                }
                else
                {
                  grp_name = '-';
                }

                const in_data = {
                                'survey_id': this.txt_dsg_sur_id,
                                'question': this.txt_dsg_sur_ques,
                                'answer_type': this.txt_dsg_ans_type,
                                'sl_no': (this.addedQuesList.length + 1),
                                'question_section_name': grp_name,
                                'mandatory': this.ckb_ques_val
                              };

                this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

                  const result = success['data'][0];

                  if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
                  {

                    this.httpReq.postSurQues(in_data).subscribe(success=>{

                      const sur_cid = success['data']['id'];

                      for(var i=0; i<this.childInsData.length; i++)
                      {
                          this.childInsData[i]['survey_q_id'] = sur_cid;
                      }

                      const cin_data = {'survey_answers': this.childInsData};

                      this.httpReq.postAnsDateInfo(cin_data).subscribe(success=>{

                        this.isShwSpinner   = true;

                        this.clear();

                      });

                    });
                  }
                  else
                  {
                    this.isShwSpinner   = true;

                    this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                  }
                });
              }
            }
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Check date info and select date format to continue...');
          }
        }
        if (this.txt_dsg_ans_type === 'File Upload')
        {
          if (this.tempAnswersList.length > 0)
          {
            this.childInsData = [];

            for (var i=0; i<this.tempAnswersList.length; i++)
            {
              const child_data = {
                                  'survey_id':  this.txt_dsg_sur_id,
                                  'survey_q_id': '',
                                  'instruction': this.inst_file,
                                  'pdf': this.ckb_pdf_info,
                                  'doc_docx': this.ckb_doc_info,
                                  'png': this.ckb_png_info,
                                  'jpg_jpeg': this.ckb_jpg_info,
                                  'gif': this.ckb_gif_info,
                                  'error_message': this.txt_file_message
                                };
              this.childInsData.push(child_data);
            }

            if(this.childInsData.length > 0)
            {
              let grp_name;

              if(this.txt_dsg_assign_grp != 'Select Group')
              {
                grp_name = this.txt_dsg_assign_grp;
              }
              else
              {
                grp_name = '-';
              }

              const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'sl_no': (this.addedQuesList.length + 1),
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

              this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
                {

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    const sur_cid = success['data']['id'];

                    for(var i=0; i<this.childInsData.length; i++)
                    {
                        this.childInsData[i]['survey_q_id'] = sur_cid;
                    }

                    const cin_data = {'survey_answers': this.childInsData};

                    this.httpReq.postAnsFileUpInfo(cin_data).subscribe(success=>{

                      this.isShwSpinner   = true;

                      this.clear();

                    });

                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }
              });
            }
          }
        }
        if (this.txt_dsg_ans_type === 'Matrix / Rating Scale')
        {
          if (this.tempAnswersList.length > 0)
          {
            this.childInsData    = [];

            for (var i = 0; i < this.tempAnswersList.length; i++)
            {
              if (this.txt_answers[i].length <= 0)
              {
                this.isShwSpinner = true;

                this.evtEmit.toastErrMsg('Enter row label to continue...');
                return;
              }

              const child_data = {
                                  'survey_id': this.txt_dsg_sur_id,
                                  'survey_q_id': '',
                                  'matrix_type': 'row',
                                  'matrix_ans_type': this.txt_dsg_ans_type,
                                  'matrix_value': this.txt_answers[i]
                                };

              this.childInsData.push(child_data);
            }

            for (var k = 0; k < this.tempColAnsList.length; k++)
            {
              if (this.txt_col_answers[k].length <= 0)
              {
                this.isShwSpinner = true;

                this.evtEmit.toastErrMsg('Enter column label to continue...');
                return;
              }

              const child_col_data = {
                                      'survey_id': this.txt_dsg_sur_id,
                                      'survey_q_id': '',
                                      'matrix_type': 'column',
                                      'matrix_ans_type': this.txt_dsg_ans_type,
                                      'matrix_value': this.txt_col_answers[k]
                                    };

              this.childInsData.push(child_col_data);
            }

            let grp_name;

            if(this.txt_dsg_assign_grp != 'Select Group')
            {
              grp_name = this.txt_dsg_assign_grp;
            }
            else
            {
              grp_name = '-';
            }

            const in_data = {
                              'survey_id': this.txt_dsg_sur_id,
                              'question': this.txt_dsg_sur_ques,
                              'answer_type': this.txt_dsg_ans_type,
                              'question_section_name': grp_name,
                              'mandatory': this.ckb_ques_val
                            };

            this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

              const result = success['data'][0];

              if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
              {

                this.httpReq.postSurQues(in_data).subscribe(success=>{

                  const sur_cid = success['data']['id'];

                  for(var i=0; i<this.childInsData.length; i++)
                  {
                      this.childInsData[i]['survey_q_id'] = sur_cid;
                  }

                  const cin_data = {'survey_answers': this.childInsData};

                  this.httpReq.postAnsMatrix(cin_data).subscribe(success=>{

                    this.isShwSpinner   = true;

                    this.clear();

                  });

                });
              }
              else
              {
                this.isShwSpinner   = true;

                this.evtEmit.toastErrMsg('Duplicate question and answer type...');
              }
            });
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Enter row and column labels to  continue...');
          }
        }
        if(this.txt_dsg_ans_type === 'Table')
        {
          if((!isNaN(this.txt_row_count) && this.txt_row_count >0) && (!isNaN(this.txt_col_count) && this.txt_col_count >0))
          {
            if(this.tempAnswersList.length > 0)
            {
              this.childInsData = [];

              for(var i=0; i<this.tempAnswersList.length; i++)
              {
                if(this.txt_answers[i].length <= 0)
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Enter answer to continue...');

                  return;
                }

                const child_data = {
                                    'survey_id':  this.txt_dsg_sur_id,
                                    'survey_q_id': '',
                                    'answer': this.txt_answers[i]
                                  };

                this.childInsData.push(child_data);
              }

              let grp_name;

              if(this.txt_dsg_assign_grp != 'Select Group')
              {
                grp_name = this.txt_dsg_assign_grp;
              }
              else
              {
                grp_name = '-';
              }

              const in_data = {
                                'survey_id': this.txt_dsg_sur_id,
                                'question': this.txt_dsg_sur_ques,
                                'answer_type': this.txt_dsg_ans_type,
                                'answer_sub_type': this.txt_row_count,
                                'answer_scale': this.txt_col_count,
                                'sl_no': (this.addedQuesList.length + 1),
                                'question_section_name': grp_name,
                                'mandatory': this.ckb_ques_val
                              };

              this.httpReq.chkQuestion(this.txt_dsg_sur_id, this.txt_dsg_sur_ques, this.txt_dsg_ans_type).subscribe(success=>{

                const result = success['data'][0];

                if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
                {

                  this.httpReq.postSurQues(in_data).subscribe(success=>{

                    const sur_cid = success['data']['id'];

                    for(var i=0; i<this.childInsData.length; i++)
                    {
                        this.childInsData[i]['survey_q_id'] = sur_cid;
                    }

                    const cin_data = {'survey_answers': this.childInsData};

                    this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

                      this.isShwSpinner   = true;

                      this.clear();

                    });

                  });
                }
                else
                {
                  this.isShwSpinner   = true;

                  this.evtEmit.toastErrMsg('Duplicate question and answer type...');
                }

              });
            }
          }
          else
          {
            this.isShwSpinner   = true;

            this.evtEmit.toastErrMsg('Column and Row value should be numeric and greater than zero...');
          }
        }
      }
      else
      {
        this.isShwSpinner   = true;

        this.evtEmit.toastErrMsg('Question is mandatory...');
      }
    }
  }

  getAddedQues(){

    if(this.txt_dsg_sur_id != '')
    {
      this.getSurQuesGroup();

      this.httpReq.getSurveyQues(this.txt_dsg_sur_id).subscribe(success=>{

        this.addedQuesList = (success['data']);

        if(this.addedQuesList.length > 0)
        {
          this.isQuestAdded       = false;
          this.isQuesMsgDisplay   = true;
        }
        else
        {
          this.isQuestAdded       = true;
          this.isQuesMsgDisplay   = false;
        }

      });
    }
  }

  loadEdit(val: string, val_1: string, val_2: string, target, val_3, val_4){

    this.closePrvModal();

    this.clear();

    this.txt_dsg_sur_cid   = val;

    this.txt_dsg_sur_ques  = val_1;

    this.txt_dsg_ans_type  = val_2;

    this.isSaveBtnHidden   = false;

    this.edit_sl_no        = val_3;

    if(val_4 === 'f')
    {
      this.ckb_ques_val = false;
    }
    if(val_4 === 't')
    {
      this.ckb_ques_val = true;
    }

    this.scrollToElement(target);

    if(val_2 === 'Multiple Choice' || val_2 === 'Checkboxes' || val_2 === 'Dropdown'  || val_2 === 'Multiple Textboxes' || val_2 === 'Ranking')
    {
      this.isAnsScaleHidden   = true;

      if(val_2 === 'Multiple Choice')
      {
        this.isAnsListHidden    = false;
        this.isAnsAbbrHidden    = false;
      }

      if(val_2 === 'Checkboxes')
      {
        this.isChkListHidden    = false;
        this.isAnsAbbrHidden    = false;
      }

      if(val_2 === 'Dropdown')
      {
        this.isDropDwnHidden    = false;
        this.isAnsAbbrHidden    = false;
      }

      if( val_2 === 'Multiple Textboxes')
      {
        this.isXTextHidden      = false;
        this.isAnsAbbrHidden    = true;
      }

      if(val_2 === 'Ranking')
      {
        this.isRankingHidden    = false;
        this.isAnsAbbrHidden    = true;
      }

      this.tempAnswersList.length = 0;
      this.txt_answers = [];

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['answer_sub_type'])
          {
            this.txt_dsg_ans_abbr        = this.addedQuesList[i]['answer_sub_type'];
            this.txt_dsg_ans_scale       = this.addedQuesList[i]['answer_scale'];
          }
          else
          {
            this.txt_dsg_ans_abbr = 'Select Type';
          }

          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.getAnsAbbr();

      this.httpReq.getSurQuesAns(this.txt_dsg_sur_cid).subscribe(success=>{

        this.answersList = success['data'];

        this.addedAnswerList = success['data'];

        for(var i=0; i<this.answersList.length; i++)
        {
          const temp = {
                         'id': i+1,
                         'answer': this.answersList[i]['answer']
                      };

          this.txt_answers[i] = this.answersList[i]['answer'];

          this.txt_rbtn[i];

          this.tempAnswersList.push(temp);

        }

        this.isSaveBtnHidden   = false;

      });
    }

    if(val_2 === 'Star Rating')
    {
      this.loadStarRating(val, val_1, val_2, val_3);

      this.isAnsScaleHidden   = false;

      this.tempAnswersList.length = 0;
      this.txt_answers = [];

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.httpReq.getSurQuesAns(this.txt_dsg_sur_cid).subscribe(success=>{

        this.answersList = success['data'];

        this.addedAnswerList = success['data'];

        if(this.addedAnswerList.length > 0)
        {
          this.star_label_chk = true;
        }

        for(var i=0; i<this.answersList.length; i++)
        {
          const temp = {
                         'id': i+1,
                         'answer': this.answersList[i]['answer']
                      };

          this.txt_answers[i] = this.answersList[i]['answer'];

          this.txt_rbtn[i];

          this.tempAnswersList.push(temp);

        }

        this.isSaveBtnHidden   = false;

      });
    }

    if(val_2 === 'Table')
    {
      this.isTable                = false;
      this.tempAnswersList.length = 0;
      this.txt_answers            = [];

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          this.txt_row_count = this.addedQuesList[i]['answer_sub_type'];
          this.txt_col_count = this.addedQuesList[i]['answer_scale'];

          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }

        }
      }

      this.httpReq.getSurQuesAns(this.txt_dsg_sur_cid).subscribe(success=>{

        this.answersList = success['data'];

        this.addedAnswerList = success['data'];

        for(var i=0; i<this.answersList.length; i++)
        {
          const temp = {
                         'id': i+1,
                         'answer': this.answersList[i]['answer']
                      };

          this.txt_answers[i] = this.answersList[i]['answer'];

          this.tempAnswersList.push(temp);

        }

        this.isSaveBtnHidden   = false;

      });
    }

    if(val_2 === 'Slider')
    {
      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          this.txt_slider_step = this.addedQuesList[i]['answer_scale'];

          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.isAnsScaleHidden   = true;
      this.isSlider           = false;
      this.tempAnswersList.length = 0;
      this.txt_answers = [];

      this.httpReq.getSurQuesAns(this.txt_dsg_sur_cid).subscribe(success=>{

        this.answersList = success['data'];

        this.addedAnswerList = success['data'];

        if(this.addedAnswerList.length > 0)
        {
          this.txt_slider_min = this.answersList[0]['answer'];
          this.txt_slider_max = this.answersList[1]['answer'];
        }

        this.isSaveBtnHidden   = false;

      });
    }

    if(val_2 === 'Matrix / Rating Scale')
    {
      this.isMatrixHidden = false;

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.httpReq.getSurMatScaleAns(this.txt_dsg_sur_cid).subscribe(success=>{

        this.answersList = success['data'];

        this.addedAnswerList = success['data'];

        for(var i=0; i<this.answersList.length; i++)
        {

          const temp = {
                         'id': i+1,
                         'answer': this.answersList[i]['matrix_value']
                        };

          if(this.answersList[i]['matrix_type'] === 'row')
          {
            this.tempAnswersList.push(temp);
          }

          if(this.answersList[i]['matrix_type'] === 'column')
          {
            this.tempColAnsList.push(temp);
          }

        }

        for(var j=0; j<this.tempAnswersList.length; j++)
        {
          this.txt_answers[j] = this.tempAnswersList[j]['answer'];
        }

        for(var k=0; k<this.tempColAnsList.length; k++)
        {
          this.txt_col_answers[k] = this.tempColAnsList[k]['answer'];
        }

        this.isSaveBtnHidden   = false;

      });

    }

    if(val_2 === 'Comment Box')
    {
      this.isCommentHidden = false;

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }
    }

    if(val_2 === 'Single Textbox')
    {
      this.isSingleTextHidden = false;

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }
    }

    if(val_2 === 'Contact Information')
    {
      this.isContactHidden   = false;

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.httpReq.getContactInfo().subscribe(success=>{

        this.contactList = success['data'];

        this.httpReq.getSurContactAns(val).subscribe(success=>{

          this.addedContactList = success['data'];

          for(var i=0; i<this.contactList.length; i++)
          {
            this.txt_contact_lbl[i] = this.contactList[i]['contact_info_col'];

            this.ckb_contact_lbl[i] = false;

            for(var j=0; j<this.addedContactList.length; j++)
            {
              if(this.contactList[i]['contact_info_col'] === this.addedContactList[j]['contact_info_type'])
              {
                this.txt_contact_lbl[i] = this.addedContactList[j]['contact_info_label'];

                this.ckb_contact_lbl[i] = true;
              }
            }
          }

        });

      });
    }

    if(val_2 === 'Date / Time')
    {
      this.isDatePickerHidden = false;

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.httpReq.getSurDateAns(val).subscribe(success=>{

        this.tempAnswersList = success['data'];

        this.rbtn_date_format    = this.tempAnswersList[0]['date_format'];

        if(this.tempAnswersList[0]['date_info'] === 't')
        {
          this.ckb_date_info  = true;
        }
        else
        {
          this.ckb_time_info  = false;
        }

        if(this.tempAnswersList[0]['time_info'] === 't')
        {
          this.ckb_time_info  = true;
        }
        else
        {
          this.ckb_time_info  = false;
        }

        this.txt_date_message    = this.tempAnswersList[0]['error_message'];

        if(this.tempAnswersList.length > 0)
        {
          for(var i=0; i<this.tempAnswersList.length; i++)
          {
            this.txt_answers[i] = this.tempAnswersList[i]['display_label'];
          }
        }
        else
        {

        }
      });
    }

    if(val_2 === 'File Upload')
    {
      this.isFileUploadHidden = false;

      for(var i=0; i<this.addedQuesList.length; i++)
      {
        if(this.addedQuesList[i]['id'] === val)
        {
          if(this.addedQuesList[i]['question_section_name'] != '-')
          {
            this.txt_dsg_assign_grp = this.addedQuesList[i]['question_section_name'];
          }
          else
          {
            this.txt_dsg_assign_grp = 'Select Group';
          }
        }
      }

      this.httpReq.getSurFileUpAns(val).subscribe(success=>{

        this.tempAnswersList    = success['data'];

        if(this.tempAnswersList[0]['pdf'] === 't')
        {
          this.ckb_pdf_info  = true;
        }
        else
        {
          this.ckb_pdf_info  = false;
        }

        if(this.tempAnswersList[0]['doc_docx'] === 't')
        {
          this.ckb_doc_info  = true;
        }
        else
        {
          this.ckb_doc_info  = false;
        }

        if(this.tempAnswersList[0]['png'] === 't')
        {
          this.ckb_png_info  = true;
        }
        else
        {
          this.ckb_png_info  = false;
        }

        if(this.tempAnswersList[0]['jpg_jpeg'] === 't')
        {
          this.ckb_jpg_info  = true;
        }
        else
        {
          this.ckb_jpg_info  = false;
        }

        if(this.tempAnswersList[0]['gif'] === 't')
        {
          this.ckb_gif_info  = true;
        }
        else
        {
          this.ckb_gif_info  = false;
        }

        this.txt_file_message = this.tempAnswersList[0]['error_message'];

        this.txt_answers[0]   = this.tempAnswersList[0]['inst_file'];
      });
    }
  }

  deleteSurQues(val: string){

    this.httpReq.destroySurQues(val).subscribe(success=>{

      this.clear();

      this.getAddedQues();

    });
  }

  addQuesTSur(val: string, ques: string, ans: string){

    if(this.addedQuesList.length >= this.txt_dsg_ques_limit)
    {
      this.evtEmit.toastErrMsg('We recommed maximum 5 questions in a survey to ensure optimal response');
    }

    this.httpReq.chkTempQuestion(this.txt_dsg_sur_id, ques, ans).subscribe(success=>{

      const result = success['data'][0];

      if(result['p12_mm_survey_c1s'] != 'Duplicate question and answer type')
      {
        this.httpReq.getTempQuesAns(val).subscribe(success=>{

          this.var_temp_ans = success['data'];

          const temp = {
                        'survey_id': this.txt_dsg_sur_id,
                        'question': ques,
                        'answer_type': ans,
                        'sl_no': (this.addedQuesList.length + 1),
                        'question_section_name': '-',
                        'mandatory': false
                      };

          this.httpReq.postSurQues(temp).subscribe(success=>{

            const sur_cid = success['data']['id'];

            this.childInsData = [];

            for(var j=0; j<this.var_temp_ans.length; j++)
            {
              const child_data = {
                                  'survey_id':  this.txt_dsg_sur_id,
                                  'survey_q_id': sur_cid,
                                  'answer': this.var_temp_ans[j]['answer']
                                };

              this.childInsData.push(child_data);
            }

            const cin_data = {'survey_answers': this.childInsData};

            this.httpReq.postSurAnswer(cin_data).subscribe(success=>{

              this.evtEmit.toastSucMsg('Question is added');

              this.clear();

              this.getAddedQues();

            });
          });
        });
      }
      else
      {
        this.isShwSpinner   = true;

        this.evtEmit.toastErrMsg('Question is already added...');
      }
    });
  }

  updQNS()
  {
    const in_data = { 'display_ques_no': this.ckb_qno_val};

    this.httpReq.putSurvey(this.txt_dsg_sur_id, in_data).subscribe(success=>{

    });
  }

  onFileChanged(event) {

    console.log(event.target.files[0].size);

    const file_size = event.target.files[0].size*0.000001;

    const file = event.target.files[0].name.toLowerCase();

    this.up_file_name = event.target.files[0].name;

    const extension = file.substring(file.lastIndexOf('.') + 1);

    if(file_size < 2)
    {
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
    else
    {
      this.evtEmit.toastErrMsg('Logo size should be less than 2MB');

    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);

    const in_data = {
                      'file': this.base64textString,
                      'email_id': this.userService.getUserEmail(),
                      'survey_id': '',
                      'logo_name': ''
                    };

    this.file_upload_data.push(in_data);
  }

  onUpload(action_type) {

    let new_logo_name  = '';

    if(this.previous_logo_path)
    {
      console.log(this.previous_logo_path);

      const str = this.previous_logo_path;

      const res = /[^/]*$/.exec(str)[0];

      const filename = str.substring(str.lastIndexOf('/')+1);

      const last_char = res[res.length - 5];

      const next_val = (parseInt(last_char) + 1);

      new_logo_name  = 'logo_' + next_val + '.png';
    }
    else
    {
      new_logo_name = 'logo_0.png';
    }

    this.file_upload_data[0]['survey_id'] = this.txt_dsg_sur_id;
    this.file_upload_data[0]['logo_name'] = new_logo_name;

    /*const in_data = {
                      'file': this.base64textString,
                      'email_id': this.userService.getUserEmail(),
                      'survey_id': this.txt_dsg_sur_id,
                      'logo_name': new_logo_name
                    };*/

    const logo_data = {
                        'logo': '/subscriber_files/' + this.userService.getUserEmail() + '/' + this.txt_dsg_sur_id + '/logo/' + new_logo_name,
                        'logo_name': this.up_file_name,
                        "survey_name": this.txt_previous_title,
                        "expires_at": this.datePipe.transform(this.dtp_sur_expire,"yyyy-MM-dd"),
                        'email_id': this.userService.getUserEmail()
                      }

    if(this.file_upload_data[0]['file'])
    {
      this.httpReq.postImage(this.file_upload_data[0]).subscribe(success=>{

        this.httpReq.putSurvey(this.txt_dsg_sur_id, logo_data).subscribe(success=>{

          this.file_upload_data = [];

          this.httpReq.getSurveyMain(this.txt_dsg_sur_id).subscribe(success => {
            this.txt_dsg_sur_title  = success['data']['survey_name'];
            this.txt_previous_title = success['data']['survey_name'];
            this.txt_dsg_sur_cat    = success['data']['survey_category'];
            this.txt_dsg_sur_logo   = success['data']['logo'];
            this.previous_logo_path = success['data']['logo'];
            if(success['data']['display_ques_no'] === 'f')
            {
              this.ckb_qno_val = false;
            }
            if(success['data']['display_ques_no'] === 't')
            {
              this.ckb_qno_val = true;
            }

            if(this.txt_dsg_sur_logo)
            {
              const in_data = {
                                'file': this.base64textString,
                                'email_id': this.userService.getUserEmail(),
                                'survey_id': this.txt_dsg_sur_id,
                                'logo_name': success['data']['logo_name']
                              };
              this.file_upload_data.push(in_data);
            }
            this.loadDate(success['data']['expires_at']);
            this.loadLogoName(success['data']['logo_name']);

            this.isShwSpinner   = true;

            if(action_type === 'Update')
            {
              this.evtEmit.toastSucMsg('Survey updated...');

              this.isShowEditSur = true;
            }

            if(action_type === 'Preview')
            {
              this.userService.setScreen('Preview');

              this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(this.txt_dsg_sur_id) } });
            }
          });
        });
      });
    }
  }

  loadPreview(){

    if(this.addedQuesList.length > 0)
    {
      this.router.navigate(['/survey-preview'], { queryParams: { survey: btoa(this.txt_dsg_sur_id) } });
    }
    else
    {
      this.evtEmit.toastSucMsg('Add question to preview');
    }
  }
}

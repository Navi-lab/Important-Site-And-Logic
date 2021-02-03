import { Component, OnInit, Inject } from '@angular/core'
import { FeedbackServiceService } from '../feedback-service.service';
import { DatePipe } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']

})

export class FeedbackComponent implements OnInit {

  constructor(
              private appServ: FeedbackServiceService,
              private datePipe: DatePipe,
              public evtEmit: EventEmitterService,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
            ) {
                iconRegistry.addSvgIcon(
                  'cross',
                  sanitizer.bypassSecurityTrustResourceUrl('/images/svg_icons/cross-out.svg')
                );
              }

  txt_fdb_sur_id      = '';
  txt_fdb_sur_logo    = '';
  txt_fdb_sur_title   = '';
  txt_fdb_sur_cat     = '';
  txt_fdb_sur_email   = '';
  txt_fdb_type        = '';
  txt_fdb_user_email  = '';
  txt_fdb_sur_expire  = '';
  user_message        = '';
  surveyList          = '';
  surveyQuesList      = '';
  surveyAnsList       = '';
  user_name           = '';
  txt_comment_box     = [];
  generateAns         = [];
  rbtn_chk_val        = [];
  ckb_answer_val      = [];
  sel_answer_val      = [];
  txt_single_ans      = [];
  contactIns          = [];
  contactInfoList:any[] = [];
  dateInfoList:any[]  = [];
  sel_date_ans:any[]  = [];
  txt_contact_ans:any[] = [];
  max:any[]           = [];
  min:any[]           = [];
  showTicks:any[]     = [];
  step:any[]          = [];
  txt_slider_value:any[] = [];
  txt_star_value:any[]   = [];
  txt_multi_ans       = [];
  sliderData          = [];
  cssRate             = [];
  chk_counter:number  = 0;
  realChkCounter:number = 0;
  isNxtHidden         = false;
  isSveHidden         = true;
  isThxHidden         = true;
  isQuesHidden        = false;
  isEndThxHidden      = true;
  isOthMsgHidden      = true;
  isShwSpinner        = false;
  fileInfoList:any[]  = [];
  isFileHidden        = [true];
  isUploadHidden      = [false];
  selectedFile:any[]  = [];
  upload_file_name    = [];
  fileIns             = [];
  sel_ranking_val     = [];
  private base64textString:string = '';
  new_index             = 0;
  sur_main              = 0;
  sur_child             = 0;
  rankDropDownValue     = [];
  matRowScaleList:any[] = [];
  matColScaleList:any[] = [];
  matScaleAnsList:any[] = [];
  rbtn_mat_val          = [];
  tabRowList            = [];
  txt_table_ans:any[]   = [];
  surveyGrpList         = [];
  newGrpList            = [];
  ckb_qno_val;
  file_types;

  ngOnInit() {

    this.txt_fdb_sur_id     = this.appServ.getSurId();
    this.txt_fdb_user_email = this.appServ.getUserInfo();
    this.txt_fdb_type       = this.appServ.getType();

    if(atob(this.txt_fdb_type) === 'Email')
    {
      this.getFeedback();
    }
    if(atob(this.txt_fdb_type) === 'Copied Link')
    {
      this.getSurvey();
    }
    if(atob(this.txt_fdb_type) === 'SMS')
    {
      this.getSurvey();
    }
  }

  getFeedback(){

    this.appServ.validateUser(this.txt_fdb_user_email, this.txt_fdb_sur_id).subscribe(success=>{

      const result = (success['data']);

      if(result === '.')
      {
        this.getSurvey();
      }

      if(result === 'Feedback is already given')
      {
        this.user_message = result;
        this.isNxtHidden  = true;
        this.isSveHidden  = true;
        this.isThxHidden  = false;
        this.isQuesHidden = true;
        this.isEndThxHidden = true;
        this.isOthMsgHidden = false;
        this.isShwSpinner   = true;
      }

      if(result === 'Invalid User')
      {
        this.user_message = result;
        this.isNxtHidden  = true;
        this.isSveHidden  = true;
        this.isThxHidden  = false;
        this.isQuesHidden = true;
        this.isEndThxHidden = true;
        this.isOthMsgHidden = false;
      }

    });
  }

  loadValidateDate(param_date)
  {
    const today_date = new Date();

    const sur_date   = new Date(param_date);

    if(this.datePipe.transform(sur_date,"yyyy-MM-dd") < this.datePipe.transform(today_date,"yyyy-MM-dd")){

      this.user_message = 'Sorry link has been expired!';
      this.isNxtHidden  = true;
      this.isSveHidden  = true;
      this.isThxHidden  = false;
      this.isQuesHidden = true;
      this.isEndThxHidden = true;
      this.isOthMsgHidden = false;
      this.isShwSpinner   = true;
    }
  }

  getSurvey(){

    this.appServ.getSurveyDetails(this.txt_fdb_sur_id).subscribe(success=>{

      const out_data = success['data'];

      this.surveyList      = out_data['survey_main'];
      this.surveyGrpList   = out_data['survey_grp'];
      this.surveyQuesList  = out_data['survey_ques'];
      this.surveyAnsList   = out_data['survey_ans'];
      this.contactInfoList = out_data['survey_contact'];
      this.sliderData      = out_data['survey_slider'];
      this.dateInfoList    = out_data['survey_date'];
      this.fileInfoList    = out_data['survey_file'];
      this.matRowScaleList = out_data['survey_mat_row_scale'];
      this.matColScaleList = out_data['survey_mat_col_scale'];

      this.txt_fdb_sur_title  = this.surveyList[0]['survey_name'];
      this.txt_fdb_sur_cat    = this.surveyList[0]['survey_category'];
      this.txt_fdb_sur_logo   = this.surveyList[0]['logo'];
      this.txt_fdb_sur_email  = this.surveyList[0]['email_id'];
      this.txt_fdb_sur_expire = this.surveyList[0]['expires_at'];

      if(this.surveyList[0]['display_ques_no'] === 'f')
      {
        this.ckb_qno_val = false;
      }
      if(this.surveyList[0]['display_ques_no'] === 't')
      {
        this.ckb_qno_val = true;
      }

      if(this.txt_fdb_sur_expire)
      {
        this.loadValidateDate(this.txt_fdb_sur_expire);
      }

      this.appServ.setAdminEmail(this.txt_fdb_sur_email);

      this.isShwSpinner  = true;

      for(var i=0; i<this.surveyQuesList.length; i++)
      {
        if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice')
        {
          this.rbtn_chk_val[i] = false;
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Comment Box')
        {
          this.txt_comment_box[i] = '';
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Multiple Textboxes')
        {
          for(var j=0; j<this.surveyAnsList.length; j++)
          {
            if(this.surveyQuesList[i]['id'] === this.surveyAnsList[j]['survey_q_id'])
            {
              this.txt_multi_ans[this.surveyAnsList[j]['id']] = '';
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Checkboxes')
        {
          this.chk_counter    = this.chk_counter + 1;
          this.realChkCounter = this.realChkCounter + 1;

          for(var j=0; j<this.surveyAnsList.length; j++)
          {
            if(this.surveyQuesList[i]['id'] === this.surveyAnsList[j]['survey_q_id'])
            {
              this.ckb_answer_val[this.surveyAnsList[j]['id']] = false;
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Dropdown')
        {
          this.sel_answer_val[i] = '';
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Star Rating')
        {
          this.txt_star_value[i] = '';
          this.cssRate[i] = 0;
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Single Textbox')
        {
          this.txt_single_ans[i] = '';
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Contact Information')
        {
          for(var j=0; j<this.contactInfoList.length; j++)
          {
            this.txt_contact_ans[this.contactInfoList[j]['id']] = '';
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Slider')
        {
          const slider_step = this.surveyQuesList[i]['answer_scale'];

          for(var j=0; j<this.sliderData.length; j++)
          {
            if(this.sliderData[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
            {
              this.max[i]        = this.sliderData[j]['last_value'];
              this.min[i]        = this.sliderData[j]['first_value'];
              this.showTicks[i]  = true;
              this.step[i]       = slider_step;
              this.txt_slider_value[i] = 0;
            }
          }
        }

        if (this.surveyQuesList[i]['answer_type'] === 'Date / Time')
        {
          this.sel_date_ans[i] = '';
        }

        if(this.surveyQuesList[i]['answer_type'] === 'File Upload')
        {
          this.upload_file_name[i]   = '';
          this.isFileHidden[i]       = true;
          this.isUploadHidden[i]     = false;
          this.selectedFile[i];

          for(var j=0; j<this.fileInfoList.length; j++)
          {
            this.file_types
          }

        }

        if(this.surveyQuesList[i]['answer_type'] === 'Ranking')
        {
          let count = 0;

          for(var j=0; j<this.surveyAnsList.length; j++)
          {
            if(this.surveyQuesList[i]['id'] === this.surveyAnsList[j]['survey_q_id'])
            {
              this.sel_ranking_val[this.surveyAnsList[j]['id']] = '';

              count = count + 1;

              const temp = {
                              'id': count,
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'ans_array': []
                            }

              this.rankDropDownValue.push(temp);
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Matrix / Rating Scale')
        {
          for(var j=0; j<this.matRowScaleList.length; j++)
          {
            if(this.surveyQuesList[i]['id'] === this.matRowScaleList[j]['survey_q_id'])
            {
              this.rbtn_mat_val[this.matRowScaleList[j]['id']] = false;
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Table')
        {
          for(var j=0; j<this.surveyQuesList[i]['answer_sub_type']; j++)
          {
            const temp = {
                            'id': j+1,
                            'survey_q_id': this.surveyQuesList[i]['id'],
                            'row': ''
                          }

            this.tabRowList.push(temp);
          }

          //.console.log(JSON.stringify(this.tabRowList));
        }
      }

      const temp = { 'question_section_name': '-' };

      this.newGrpList = [temp].concat(this.surveyGrpList);

    });
  }

  formatLabel(value: number | null) {

    if (!value) {

      return 0;
    }

    return value;
  }

  onUploadFileChanged(event, index, err_msg, sur_id, sur_q_id) {
    this.file_types               = [];
    const file                    = event.target.files[0].name.toLowerCase();
    this.upload_file_name[index]  = event.target.files[0].name;
    const extension               = file.substring(file.lastIndexOf('.') + 1);

    console.log(extension);

    console.log('Array Before ' + this.file_types);

    console.log(sur_q_id);

    for(var i=0; i<this.fileInfoList.length; i++)
    {
      if(this.fileInfoList[i]['survey_q_id'] === sur_q_id)
      {
        if(this.fileInfoList[i]['pdf'] === 't')
        {
          this.file_types.push('pdf');
        }
        if(this.fileInfoList[i]['doc_docx'] === 't')
        {
          this.file_types.push('doc');
          this.file_types.push('docx');
        }
        if(this.fileInfoList[i]['png'] === 't')
        {
          this.file_types.push('png');
        }
        if(this.fileInfoList[i]['jpg_jpeg'] === 't')
        {
          this.file_types.push('jpg');
          this.file_types.push('jpeg');
        }
        if(this.fileInfoList[i]['gif'] === 't')
        {
          this.file_types.push('gif');
        }
      }
    }

    console.log('Array After ' + this.file_types);

    console.log('Comapre ' + this.file_types.includes(extension, 0));

    if(this.file_types.includes(extension, 0))
    {
        this.new_index             = index;
        this.sur_main              = sur_id;
        this.sur_child             = sur_q_id;
        this.isFileHidden[index]   = false;
        this.isUploadHidden[index] = true;
        this.selectedFile[index]   = event.target.files[0]
        var reader                 = new FileReader();
        reader.onload              = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.selectedFile[index]);

        console.log(this.upload_file_name[index]);
    }
    else
    {
      this.evtEmit.toastErrMsg(err_msg);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString     = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    const in_data = {
                    'feedback_id': '',
                    'survey_id': this.sur_main,
                    'survey_q_id': this.sur_child,
                    'file_name': this.upload_file_name[this.new_index],
                    'file_size': (Math.round(this.selectedFile[this.new_index]['size'] / 1024)),
                    'email_id': this.txt_fdb_sur_email,
                    'file': this.base64textString
                  }

    this.fileIns.push(in_data);

    console.log(JSON.stringify(in_data));

    console.log(JSON.stringify(this.fileIns));
  }

  removeFile(element, index, sur_q_id){

    this.upload_file_name[index] = '';
    this.isUploadHidden[index]   = false;
    this.isFileHidden[index]     = true;
    //element.value                = 'undefined';
    //this.selectedFile[index]     = element.value;

    for(var i=0; i<this.fileIns.length; i++)
    {
      if(this.fileIns[i]['survey_q_id'] === sur_q_id)
      {
        this.fileIns.splice(i, 1);
      }
    }

    console.log(JSON.stringify(this.fileIns));
  }

  assignRanking(value, sur_q_id, ans_id)
  {
    //console.log(value + ' ' + sur_q_id);

    for(var j=0; j<this.rankDropDownValue.length; j++)
    {
      if(parseInt(this.rankDropDownValue[j]['survey_q_id']) === parseInt(sur_q_id))
      {
        const el_value = this.rankDropDownValue[j]['ans_array'].includes(value);

        console.log(el_value);

        if(el_value)
        {
          this.sel_ranking_val[ans_id] = undefined;

          this.evtEmit.toastErrMsg('Ranking value already exist...');
        }
        else
        {
          this.rankDropDownValue[j]['ans_array'].push(value);
        }
      }
    }
  }

  saveFeedback(){

	  this.isShwSpinner       = false;

    this.generateAns.length = 0;
    this.matScaleAnsList    = [];

    if(atob(this.txt_fdb_type) === 'Email')
    {
      this.appServ.validateUser(this.txt_fdb_user_email, this.txt_fdb_sur_id).subscribe(success=>{

        const result = (success['data']);

        if(result === '.')
        {
          let getAllChkAns = [];

          for(var i=0; i<this.surveyQuesList.length; i++)
          {
            let count = 0;

            if(this.surveyQuesList[i]['answer_type'] === 'Matrix / Rating Scale')
            {
              for(var j=0; j<this.matRowScaleList.length; j++)
              {
                if(this.surveyQuesList[i]['id'] === this.matRowScaleList[j]['survey_q_id'])
                {
                  if(this.surveyQuesList[i]['mandatory'] === 't')
                  {
                    if(this.rbtn_mat_val[this.matRowScaleList[j]['id']])
                    {
                      //console.log(this.rbtn_mat_val[this.matRowScaleList[j]['id']]);

                      const temp = {
                                      'feedback_id': '',
                                      'survey_id': this.surveyQuesList[i]['survey_id'],
                                      'survey_q_id': this.surveyQuesList[i]['id'],
                                      'matrix_row_id': this.matRowScaleList[j]['id'],
                                      'matrix_column_id': this.rbtn_mat_val[this.matRowScaleList[j]['id']]
                                    };

                      this.matScaleAnsList.push(temp);
                    }
                    else
                    {
                      this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                      this.isShwSpinner  = true;
                      return;
                    }
                  }
                  if(this.surveyQuesList[i]['mandatory'] === 'f')
                  {
                    if(this.rbtn_mat_val[this.matRowScaleList[j]['id']])
                    {
                      //console.log(this.rbtn_mat_val[this.matRowScaleList[j]['id']]);

                      const temp = {
                                      'feedback_id': '',
                                      'survey_id': this.surveyQuesList[i]['survey_id'],
                                      'survey_q_id': this.surveyQuesList[i]['id'],
                                      'matrix_row_id': this.matRowScaleList[j]['id'],
                                      'matrix_column_id': this.rbtn_mat_val[this.matRowScaleList[j]['id']]
                                    };

                      this.matScaleAnsList.push(temp);
                    }
                  }
                }
              }
            }

            if (this.surveyQuesList[i]['answer_type'] === 'Table')
            {
              for (var k=0; k<this.surveyAnsList.length; k++)
              {
                if(this.surveyQuesList[i]['id'] === this.surveyAnsList[k]['survey_q_id'])
                {
                  for (var j=0; j<this.tabRowList.length; j++)
                  {
                    let ids = 'tblAns_' + this.tabRowList[j]['id'] + '_' + this.surveyAnsList[k]['id'];

                    console.log(ids);

                    //let vals = ((document.getElementById(ids) as HTMLInputElement).value);

                    let vals = document.getElementById(ids).innerHTML;

                    console.log(vals);

                    if(this.surveyQuesList[i]['mandatory'] === 't')
                    {
                      if (vals.length != 0)
                      {
                        const temp = {
                                      'feedback_id': '',
                                      'survey_id': this.surveyQuesList[i]['survey_id'],
                                      'survey_q_id': this.surveyQuesList[i]['id'],
                                      'survey_grade_id': this.surveyAnsList[k]['id'],
                                      'survey_answer': vals
                                    };
                        this.generateAns.push(temp);
                      }
                      else
                      {
                        this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                        this.isShwSpinner  = true;

                        return;
                      }
                    }

                    if(this.surveyQuesList[i]['mandatory'] === 'f')
                    {
                      if (vals.length != 0)
                      {
                        const temp = {
                                      'feedback_id': '',
                                      'survey_id': this.surveyQuesList[i]['survey_id'],
                                      'survey_q_id': this.surveyQuesList[i]['id'],
                                      'survey_grade_id': this.surveyAnsList[k]['id'],
                                      'survey_answer': vals
                                    };
                        this.generateAns.push(temp);
                      }
                    }
                  }
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Ranking')
            {
              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if(this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
                {
                  //console.log(this.sel_ranking_val[this.surveyAnsList[j]['id']]);

                  if(this.surveyQuesList[i]['mandatory'] === 't')
                  {
                    if(this.sel_ranking_val[this.surveyAnsList[j]['id']] != '')
                    {
                      const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.sel_ranking_val[this.surveyAnsList[j]['id']]
                                  };

                      this.generateAns.push(temp);
                    }
                    else
                    {
                      this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                      this.isShwSpinner  = true;
                      return;
                    }
                  }

                  if(this.surveyQuesList[i]['mandatory'] === 'f')
                  {
                    if(this.sel_ranking_val[this.surveyAnsList[j]['id']] != '')
                    {
                      const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.sel_ranking_val[this.surveyAnsList[j]['id']]
                                  };

                      this.generateAns.push(temp);
                    }
                  }
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'File Upload')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.selectedFile[i] != undefined)
                {

                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Multiple Textboxes')
            {
              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if(this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
                {
                  if(this.surveyQuesList[i]['mandatory'] === 't')
                  {
                    if(this.txt_multi_ans[this.surveyAnsList[j]['id']].trim() != '')
                    {
                      const temp = {
                                        'feedback_id': '',
                                        'survey_id': this.surveyQuesList[i]['survey_id'],
                                        'survey_q_id': this.surveyQuesList[i]['id'],
                                        'survey_grade_id': this.surveyAnsList[j]['id'],
                                        'survey_answer': this.txt_multi_ans[this.surveyAnsList[j]['id']]
                                      };

                      this.generateAns.push(temp);
                    }
                    else
                    {
                      this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                      this.isShwSpinner  = true;
                      return;
                    }
                  }

                  if(this.surveyQuesList[i]['mandatory'] === 'f')
                  {
                    if(this.txt_multi_ans[this.surveyAnsList[j]['id']].trim() != '')
                    {
                      const temp = {
                                        'feedback_id': '',
                                        'survey_id': this.surveyQuesList[i]['survey_id'],
                                        'survey_q_id': this.surveyQuesList[i]['id'],
                                        'survey_grade_id': this.surveyAnsList[j]['id'],
                                        'survey_answer': this.txt_multi_ans[this.surveyAnsList[j]['id']]
                                      };

                      this.generateAns.push(temp);
                    }
                  }
                }
              }
            }

            if (this.surveyQuesList[i]['answer_type'] === 'Date / Time')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.sel_date_ans[i] != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.sel_date_ans[i]
                                };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.sel_date_ans[i] != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.sel_date_ans[i]
                                };

                  this.generateAns.push(temp);
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Slider')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.txt_slider_value[i])
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_slider_value[i]
                                };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.txt_slider_value[i])
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_slider_value[i]
                                };

                  this.generateAns.push(temp);
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Star Rating')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.txt_star_value[i] != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_star_value[i]
                                };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.txt_star_value[i] != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_star_value[i]
                                };

                  this.generateAns.push(temp);
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.rbtn_chk_val[i] != false)
                {
                  for(var j=0; j<this.surveyAnsList.length; j++)
                  {
                    if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.rbtn_chk_val[i]))
                    {
                      const temp = {
                                        'feedback_id': '',
                                        'survey_id': this.surveyQuesList[i]['survey_id'],
                                        'survey_q_id': this.surveyQuesList[i]['id'],
                                        'survey_grade_id': this.surveyAnsList[j]['id'],
                                        'survey_answer': this.rbtn_chk_val[i]
                                      };

                      this.generateAns.push(temp);
                    }
                  }

                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.rbtn_chk_val[i] != false)
                {
                  for(var j=0; j<this.surveyAnsList.length; j++)
                  {
                    if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.rbtn_chk_val[i]))
                    {
                      const temp = {
                                        'feedback_id': '',
                                        'survey_id': this.surveyQuesList[i]['survey_id'],
                                        'survey_q_id': this.surveyQuesList[i]['id'],
                                        'survey_grade_id': this.surveyAnsList[j]['id'],
                                        'survey_answer': this.rbtn_chk_val[i]
                                      };

                      this.generateAns.push(temp);
                    }
                  }

                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Comment Box')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.txt_comment_box[i].trim() != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_comment_box[i]
                                };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.txt_comment_box[i].trim() != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_comment_box[i]
                                };

                  this.generateAns.push(temp);
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Checkboxes')
            {
              let check_ans = [];

              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.ckb_answer_val[this.surveyAnsList[j]['id']]))
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': this.surveyAnsList[j]['id'],
                                  'survey_answer': this.surveyAnsList[j]['answer']
                                };

                  check_ans.push(temp);

                  getAllChkAns.push(temp);
                }
              }

              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(check_ans.length > 0)
                {
                  this.chk_counter = this.chk_counter - 1;

                  if(this.chk_counter == 0)
                  {
                    for(var x=0; x<getAllChkAns.length; x++)
                    {
                      this.generateAns.push(getAllChkAns[x]);
                    }
                  }
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  this.chk_counter   = this.realChkCounter;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(check_ans.length > 0)
                {
                  this.chk_counter = this.chk_counter - 1;

                  if(this.chk_counter == 0)
                  {
                    for(var x=0; x<getAllChkAns.length; x++)
                    {
                      this.generateAns.push(getAllChkAns[x]);
                    }
                  }
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Dropdown')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.sel_answer_val[i] != '' ||
                   this.sel_answer_val[i] != 'undefined')
                {
                  for(var j=0; j<this.surveyAnsList.length; j++)
                  {
                    if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.sel_answer_val[i] ))
                    {
                      const temp = {
                                        'feedback_id': '',
                                        'survey_id': this.surveyQuesList[i]['survey_id'],
                                        'survey_q_id': this.surveyQuesList[i]['id'],
                                        'survey_grade_id': this.surveyAnsList[j]['id'],
                                        'survey_answer': this.surveyAnsList[j]['answer']
                                      };

                      this.generateAns.push(temp);
                    }
                  }
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.sel_answer_val[i] != '' ||
                   this.sel_answer_val[i] != 'undefined')
                {
                  for(var j=0; j<this.surveyAnsList.length; j++)
                  {
                    if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.sel_answer_val[i] ))
                    {
                      const temp = {
                                        'feedback_id': '',
                                        'survey_id': this.surveyQuesList[i]['survey_id'],
                                        'survey_q_id': this.surveyQuesList[i]['id'],
                                        'survey_grade_id': this.surveyAnsList[j]['id'],
                                        'survey_answer': this.surveyAnsList[j]['answer']
                                      };

                      this.generateAns.push(temp);
                    }
                  }
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Single Textbox')
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.txt_single_ans[i].trim() != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_single_ans[i]
                                };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.txt_single_ans[i].trim() != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': 0,
                                  'survey_answer': this.txt_single_ans[i]
                                };

                  this.generateAns.push(temp);
                }
              }
            }

            if(this.surveyQuesList[i]['answer_type'] === 'Contact Information')
            {
              for(var j=0; j<this.contactInfoList.length; j++)
              {
                if(this.contactInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
                {
                  if(this.surveyQuesList[i]['mandatory'] === 't')
                  {
                    if(this.txt_contact_ans[this.contactInfoList[j]['id']].trim() != '')
                    {
                      const temp = {
                                      'feedback_id': '',
                                      'survey_id': this.contactInfoList[j]['survey_id'],
                                      'survey_q_id': this.contactInfoList[j]['survey_q_id'],
                                      'contact_info_id': this.contactInfoList[j]['id'],
                                      'contact_info_value': this.txt_contact_ans[this.contactInfoList[j]['id']]
                                    };

                      this.contactIns.push(temp);
                    }
                    else
                    {
                      this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                      this.isShwSpinner  = true;
                      return;
                    }
                  }
                  if(this.surveyQuesList[i]['mandatory'] === 'f')
                  {
                    if(this.txt_contact_ans[this.contactInfoList[j]['id']].trim() != '')
                    {
                      const temp = {
                                      'feedback_id': '',
                                      'survey_id': this.contactInfoList[j]['survey_id'],
                                      'survey_q_id': this.contactInfoList[j]['survey_q_id'],
                                      'contact_info_id': this.contactInfoList[j]['id'],
                                      'contact_info_value': this.txt_contact_ans[this.contactInfoList[j]['id']]
                                    };

                      this.contactIns.push(temp);
                    }
                  }
                }
              }
            }
          }

          if(this.generateAns.length > 0 || this.contactIns.length > 0 || this.fileIns.length > 0 || this.matScaleAnsList.length > 0)
          {
            const  in_data = {
                              'email_id': this.txt_fdb_sur_email,
                              'survey_id': this.surveyList[0]['id'],
                              'user_info': this.txt_fdb_user_email,
                              'feedback_type': atob(this.txt_fdb_type)
                            };

            this.appServ.postFeedback(in_data).subscribe(success=>{

              const fdb_id = success['data']['id'];

              for(var i=0; i<this.generateAns.length; i++)
              {
                this.generateAns[i]['feedback_id'] = fdb_id;
              }

              if(this.contactIns.length > 0)
              {
                for(var i=0; i<this.contactIns.length; i++)
                {
                  this.contactIns[i]['feedback_id'] = fdb_id;
                }
              }

              if(this.fileIns.length > 0)
              {
                for(var i=0; i<this.fileIns.length; i++)
                {
                  this.fileIns[i]['feedback_id'] = fdb_id;

                  const file_ins = {'feedback_file': this.fileIns[i]};

                  this.appServ.postFileUpload(file_ins).subscribe(success=>{});
                }
              }

              if(this.matScaleAnsList.length > 0)
              {
                for(var i=0; i<this.matScaleAnsList.length; i++)
                {
                  this.matScaleAnsList[i]['feedback_id'] = fdb_id;
                }

                const mat_scale_ins = {'feedback_matrix': this.matScaleAnsList};

                this.appServ.postMatScale(mat_scale_ins).subscribe(success=>{});
              }

              const child_data = {'feedback_content': this.generateAns};

              this.appServ.postFbContent(child_data).subscribe(success=>{

                if(this.contactIns.length > 0)
                {
                  const new_ins = {'feedback_contact': this.contactIns};

                  this.appServ.postContact(new_ins).subscribe(success=>{

                    this.appServ.getUser(this.txt_fdb_sur_email).subscribe(success=>{

                      this.user_name = success['data'][0]['first_name'];

                      this.isThxHidden    = false;
                      this.isQuesHidden   = true;
                      this.isEndThxHidden = false;
                      this.isOthMsgHidden = true;
                      this.isShwSpinner   = true;

                    });
                  });
                }
                else
                {
                  this.appServ.getUser(this.txt_fdb_sur_email).subscribe(success=>{

                    this.user_name = success['data'][0]['first_name'];
                    this.isThxHidden    = false;
                    this.isQuesHidden   = true;
                    this.isEndThxHidden = false;
                    this.isOthMsgHidden = true;
                    this.isShwSpinner  = true;

                  });
                }
              });
            });
          }
          else
          {
            this.evtEmit.toastErrMsg('Please answer all the questions...');

            this.isShwSpinner  = true;
            return;
          }
        }

        if(result === 'Feedback is already given')
        {
          this.user_message = result;
          this.isNxtHidden  = true;
          this.isSveHidden  = true;
          this.isThxHidden  = false;
          this.isQuesHidden = true;
          this.isEndThxHidden = true;
          this.isOthMsgHidden = false;
          this.isShwSpinner   = true;
        }

        if(result === 'Invalid User')
        {
          this.user_message = result;
          this.isNxtHidden  = true;
          this.isSveHidden  = true;
          this.isThxHidden  = false;
          this.isQuesHidden = true;
          this.isEndThxHidden = true;
          this.isOthMsgHidden = false;
        }
      });
    }

    if(atob(this.txt_fdb_type) === 'Copied Link')
    {
      let getAllChkAns = [];

      for(var i=0; i<this.surveyQuesList.length; i++)
      {
        let count = 0;

        if(this.surveyQuesList[i]['answer_type'] === 'Matrix / Rating Scale')
        {
          for(var j=0; j<this.matRowScaleList.length; j++)
          {
            if(this.surveyQuesList[i]['id'] === this.matRowScaleList[j]['survey_q_id'])
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.rbtn_mat_val[this.matRowScaleList[j]['id']])
                {
                  //console.log(this.rbtn_mat_val[this.matRowScaleList[j]['id']]);

                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'matrix_row_id': this.matRowScaleList[j]['id'],
                                  'matrix_column_id': this.rbtn_mat_val[this.matRowScaleList[j]['id']]
                                };

                  this.matScaleAnsList.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.rbtn_mat_val[this.matRowScaleList[j]['id']])
                {
                  //console.log(this.rbtn_mat_val[this.matRowScaleList[j]['id']]);

                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'matrix_row_id': this.matRowScaleList[j]['id'],
                                  'matrix_column_id': this.rbtn_mat_val[this.matRowScaleList[j]['id']]
                                };

                  this.matScaleAnsList.push(temp);
                }
              }
            }
          }
        }

        if (this.surveyQuesList[i]['answer_type'] === 'Table')
        {
          for (var k=0; k<this.surveyAnsList.length; k++)
          {
            if(this.surveyQuesList[i]['id'] === this.surveyAnsList[k]['survey_q_id'])
            {
              for (var j=0; j<this.tabRowList.length; j++)
              {
                let ids = 'tblAns_' + this.tabRowList[j]['id'] + '_' + this.surveyAnsList[k]['id'];

                console.log(ids);

                //let vals = ((document.getElementById(ids) as HTMLInputElement).value);

                let vals = document.getElementById(ids).innerHTML;

                console.log(vals);

                if(this.surveyQuesList[i]['mandatory'] === 't')
                {
                  if (vals.length != 0)
                  {
                    const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': this.surveyAnsList[k]['id'],
                                  'survey_answer': vals
                                };
                    this.generateAns.push(temp);
                  }
                  else
                  {
                    this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                    this.isShwSpinner  = true;

                    return;
                  }
                }

                if(this.surveyQuesList[i]['mandatory'] === 'f')
                {
                  if (vals.length != 0)
                  {
                    const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.surveyQuesList[i]['survey_id'],
                                  'survey_q_id': this.surveyQuesList[i]['id'],
                                  'survey_grade_id': this.surveyAnsList[k]['id'],
                                  'survey_answer': vals
                                };
                    this.generateAns.push(temp);
                  }
                }
              }
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Ranking')
        {
          for(var j=0; j<this.surveyAnsList.length; j++)
          {
            if(this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
            {
              //console.log(this.sel_ranking_val[this.surveyAnsList[j]['id']]);

              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.sel_ranking_val[this.surveyAnsList[j]['id']] != '')
                {
                  const temp = {
                                'feedback_id': '',
                                'survey_id': this.surveyQuesList[i]['survey_id'],
                                'survey_q_id': this.surveyQuesList[i]['id'],
                                'survey_grade_id': this.surveyAnsList[j]['id'],
                                'survey_answer': this.sel_ranking_val[this.surveyAnsList[j]['id']]
                              };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }

              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.sel_ranking_val[this.surveyAnsList[j]['id']] != '')
                {
                  const temp = {
                                'feedback_id': '',
                                'survey_id': this.surveyQuesList[i]['survey_id'],
                                'survey_q_id': this.surveyQuesList[i]['id'],
                                'survey_grade_id': this.surveyAnsList[j]['id'],
                                'survey_answer': this.sel_ranking_val[this.surveyAnsList[j]['id']]
                              };

                  this.generateAns.push(temp);
                }
              }
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'File Upload')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.selectedFile[i] != undefined)
            {

            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Multiple Textboxes')
        {
          for(var j=0; j<this.surveyAnsList.length; j++)
          {
            if(this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.txt_multi_ans[this.surveyAnsList[j]['id']].trim() != '')
                {
                  const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.txt_multi_ans[this.surveyAnsList[j]['id']]
                                  };

                  this.generateAns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }

              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.txt_multi_ans[this.surveyAnsList[j]['id']].trim() != '')
                {
                  const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.txt_multi_ans[this.surveyAnsList[j]['id']]
                                  };

                  this.generateAns.push(temp);
                }
              }
            }
          }
        }

        if (this.surveyQuesList[i]['answer_type'] === 'Date / Time')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.sel_date_ans[i] != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.sel_date_ans[i]
                            };

              this.generateAns.push(temp);
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.sel_date_ans[i] != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.sel_date_ans[i]
                            };

              this.generateAns.push(temp);
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Slider')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.txt_slider_value[i])
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_slider_value[i]
                            };

              this.generateAns.push(temp);
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.txt_slider_value[i])
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_slider_value[i]
                            };

              this.generateAns.push(temp);
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Star Rating')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.txt_star_value[i] != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_star_value[i]
                            };

              this.generateAns.push(temp);
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.txt_star_value[i] != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_star_value[i]
                            };

              this.generateAns.push(temp);
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.rbtn_chk_val[i] != false)
            {
              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.rbtn_chk_val[i]))
                {
                  const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.rbtn_chk_val[i]
                                  };

                  this.generateAns.push(temp);
                }
              }

            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.rbtn_chk_val[i] != false)
            {
              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.rbtn_chk_val[i]))
                {
                  const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.rbtn_chk_val[i]
                                  };

                  this.generateAns.push(temp);
                }
              }

            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Comment Box')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.txt_comment_box[i].trim() != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_comment_box[i]
                            };

              this.generateAns.push(temp);
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.txt_comment_box[i].trim() != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_comment_box[i]
                            };

              this.generateAns.push(temp);
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Checkboxes')
        {
          let check_ans = [];

          for(var j=0; j<this.surveyAnsList.length; j++)
          {
            if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.ckb_answer_val[this.surveyAnsList[j]['id']]))
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': this.surveyAnsList[j]['id'],
                              'survey_answer': this.surveyAnsList[j]['answer']
                            };

              check_ans.push(temp);

              getAllChkAns.push(temp);
            }
          }

          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(check_ans.length > 0)
            {
              this.chk_counter = this.chk_counter - 1;

              if(this.chk_counter == 0)
              {
                for(var x=0; x<getAllChkAns.length; x++)
                {
                  this.generateAns.push(getAllChkAns[x]);
                }
              }
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              this.chk_counter   = this.realChkCounter;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(check_ans.length > 0)
            {
              this.chk_counter = this.chk_counter - 1;

              if(this.chk_counter == 0)
              {
                for(var x=0; x<getAllChkAns.length; x++)
                {
                  this.generateAns.push(getAllChkAns[x]);
                }
              }
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Dropdown')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.sel_answer_val[i] != '' ||
               this.sel_answer_val[i] != 'undefined')
            {
              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.sel_answer_val[i] ))
                {
                  const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.surveyAnsList[j]['answer']
                                  };

                  this.generateAns.push(temp);
                }
              }
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.sel_answer_val[i] != '' ||
               this.sel_answer_val[i] != 'undefined')
            {
              for(var j=0; j<this.surveyAnsList.length; j++)
              {
                if((this.surveyAnsList[j]['survey_q_id'] === this.surveyQuesList[i]['id']) && (this.surveyAnsList[j]['answer'] === this.sel_answer_val[i] ))
                {
                  const temp = {
                                    'feedback_id': '',
                                    'survey_id': this.surveyQuesList[i]['survey_id'],
                                    'survey_q_id': this.surveyQuesList[i]['id'],
                                    'survey_grade_id': this.surveyAnsList[j]['id'],
                                    'survey_answer': this.surveyAnsList[j]['answer']
                                  };

                  this.generateAns.push(temp);
                }
              }
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Single Textbox')
        {
          if(this.surveyQuesList[i]['mandatory'] === 't')
          {
            if(this.txt_single_ans[i].trim() != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_single_ans[i]
                            };

              this.generateAns.push(temp);
            }
            else
            {
              this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

              this.isShwSpinner  = true;
              return;
            }
          }
          if(this.surveyQuesList[i]['mandatory'] === 'f')
          {
            if(this.txt_single_ans[i].trim() != '')
            {
              const temp = {
                              'feedback_id': '',
                              'survey_id': this.surveyQuesList[i]['survey_id'],
                              'survey_q_id': this.surveyQuesList[i]['id'],
                              'survey_grade_id': 0,
                              'survey_answer': this.txt_single_ans[i]
                            };

              this.generateAns.push(temp);
            }
          }
        }

        if(this.surveyQuesList[i]['answer_type'] === 'Contact Information')
        {
          for(var j=0; j<this.contactInfoList.length; j++)
          {
            if(this.contactInfoList[j]['survey_q_id'] === this.surveyQuesList[i]['id'])
            {
              if(this.surveyQuesList[i]['mandatory'] === 't')
              {
                if(this.txt_contact_ans[this.contactInfoList[j]['id']].trim() != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.contactInfoList[j]['survey_id'],
                                  'survey_q_id': this.contactInfoList[j]['survey_q_id'],
                                  'contact_info_id': this.contactInfoList[j]['id'],
                                  'contact_info_value': this.txt_contact_ans[this.contactInfoList[j]['id']]
                                };

                  this.contactIns.push(temp);
                }
                else
                {
                  this.evtEmit.toastErrMsg(this.surveyQuesList[i]['question'] + ' is mandatory...');

                  this.isShwSpinner  = true;
                  return;
                }
              }
              if(this.surveyQuesList[i]['mandatory'] === 'f')
              {
                if(this.txt_contact_ans[this.contactInfoList[j]['id']].trim() != '')
                {
                  const temp = {
                                  'feedback_id': '',
                                  'survey_id': this.contactInfoList[j]['survey_id'],
                                  'survey_q_id': this.contactInfoList[j]['survey_q_id'],
                                  'contact_info_id': this.contactInfoList[j]['id'],
                                  'contact_info_value': this.txt_contact_ans[this.contactInfoList[j]['id']]
                                };

                  this.contactIns.push(temp);
                }
              }
            }
          }
        }
      }

      if(this.generateAns.length > 0 || this.contactIns.length > 0 || this.fileIns.length > 0 || this.matScaleAnsList.length > 0)
      {
        const  in_data = {
                          'email_id': this.txt_fdb_sur_email,
                          'survey_id': this.surveyList[0]['id'],
                          'user_info': this.txt_fdb_user_email,
                          'feedback_type': atob(this.txt_fdb_type)
                        };

        this.appServ.postFeedback(in_data).subscribe(success=>{

          const fdb_id = success['data']['id'];

          for(var i=0; i<this.generateAns.length; i++)
          {
            this.generateAns[i]['feedback_id'] = fdb_id;
          }

          if(this.contactIns.length > 0)
          {
            for(var i=0; i<this.contactIns.length; i++)
            {
              this.contactIns[i]['feedback_id'] = fdb_id;
            }
          }

          if(this.fileIns.length > 0)
          {
            for(var i=0; i<this.fileIns.length; i++)
            {
              this.fileIns[i]['feedback_id'] = fdb_id;

              const file_ins = {'feedback_file': this.fileIns[i]};

              this.appServ.postFileUpload(file_ins).subscribe(success=>{});
            }
          }

          if(this.matScaleAnsList.length > 0)
          {
            for(var i=0; i<this.matScaleAnsList.length; i++)
            {
              this.matScaleAnsList[i]['feedback_id'] = fdb_id;
            }

            const mat_scale_ins = {'feedback_matrix': this.matScaleAnsList};

            this.appServ.postMatScale(mat_scale_ins).subscribe(success=>{});
          }

          const child_data = {'feedback_content': this.generateAns};

          this.appServ.postFbContent(child_data).subscribe(success=>{

            if(this.contactIns.length > 0)
            {
              const new_ins = {'feedback_contact': this.contactIns};

              this.appServ.postContact(new_ins).subscribe(success=>{

                this.appServ.getUser(this.txt_fdb_sur_email).subscribe(success=>{

                  this.user_name = success['data'][0]['first_name'];

                  this.isThxHidden    = false;
                  this.isQuesHidden   = true;
                  this.isEndThxHidden = false;
                  this.isOthMsgHidden = true;
                  this.isShwSpinner   = true;

                });
              });
            }
            else
            {
              this.appServ.getUser(this.txt_fdb_sur_email).subscribe(success=>{

                this.user_name = success['data'][0]['first_name'];
                this.isThxHidden    = false;
                this.isQuesHidden   = true;
                this.isEndThxHidden = false;
                this.isOthMsgHidden = true;
    			      this.isShwSpinner  = true;

              });
            }
          });
        });
      }
      else
      {
        this.evtEmit.toastErrMsg('Please answer all the questions...');

  	    this.isShwSpinner  = true;
  	    return;
      }
    }
  }
}

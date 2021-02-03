import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { EventEmitterService } from '../event-emitter.service';
import { RequestsService } from '../requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { DatePipe } from '@angular/common';
import { OrderPipe } from 'ngx-order-pipe';
import * as jsPDF from 'jspdf';
import * as FusionCharts from "fusioncharts";
import * as alasql from 'alasql';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
				        private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                public evtEmit: EventEmitterService,
                private httpReq: RequestsService,
                iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer,
                public orderPipe: OrderPipe
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

              }

	user_name 	         = '';
	txt_res_search       = '';
	txt_res_email  	     = '';
	txt_res_sur_name     = '';
  txt_res_sur_logo     = '';
	surveyQuesList       = '';
	surveyAnsList        = '';
	surveyFeedBackList   = '';
  surveyXTxtAnswer     = '';
  public feedback_count : number = 0;
  max_ticks            = 5;
  step_size            = 1;
  drpDown              = 0;
  isChartHidden        = true;
  txt_res_sur_id  	   = '';
  txt_res_sur_title    = '';
  user_first_letter    = '';
  isShwSpinner         = true;
  contactInfoList      = [];
  contactInfoLabel     = [];
  fushionData          = [];
  otherData            = [];
  sliderData           = [];
  xTxtData             = [];
  fileInfoList         = [];
  isCDisplayData       = true;
  isCDisplayMsg        = true;
  isODisplayData       = true;
  isODisplayMsg        = true;
  order: string        = 'answers.feedback_cid';
  reverse: boolean     = false;
  sortedCollection: any[];
  matrixTable          = [];
  newChartData         = [];
  consoleResult        = [];
  summaryData          = [];
  tabRowList           = [];
  chart_type           = [];
  legend_display       = [];
  sel_chart_type       = [];
  dataSource;
 
  ngOnInit() {

    this.route.queryParams.subscribe(params => {

        const sur_id = params.survey;

        this.txt_res_sur_id = atob(sur_id);
    });

    this.getUserInfo();
  	this.loadAnalyse(this.txt_res_sur_id);
  }

  getUserInfo(){

    this.userService.getUserDetails().subscribe(success => {

      this.user_name = success['data']['first_name'];
      this.user_first_letter = this.user_name.charAt(0).toUpperCase();
      this.userService.setUserEmail(success['data']['email']);
      this.userService.setUserName(success['data']['first_name']);
      this.txt_res_email = success['data']['email'];

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

  getFeedback(){

    this.httpReq.getSurveyRes( this.txt_res_sur_id).subscribe(success=>{

      const out_data      = success['data'];

      this.txt_res_sur_title  = out_data['survey_main'][0]['survey_name'];
      this.txt_res_sur_logo   = out_data['survey_main'][0]['logo'];
      this.surveyQuesList     = out_data['survey_ques'];
      this.surveyAnsList      = out_data['survey_ans'];
      this.contactInfoList    = out_data['survey_contact'];
      this.contactInfoLabel   = out_data['survey_contact_lbl'];
      this.sliderData         = out_data['survey_slider'];
      this.surveyFeedBackList = out_data['survey_res'];
      this.surveyXTxtAnswer   = out_data['survey_xdata'];
      this.fileInfoList       = out_data['survey_file'];
      this.consoleResult      = out_data['survey_console'];

      this.httpReq.getFBContent(this.txt_res_sur_id).subscribe(success=>{

        this.tabRowList = success['data'];

      });

      if(this.surveyFeedBackList.length > 0 || this.contactInfoList.length > 0 || this.sliderData.length > 0 || this.fileInfoList.length > 0 || this.tabRowList.length > 0)
      {
        for(var i=0; i<this.surveyQuesList.length; i++)
        {
          this.sel_chart_type[this.surveyQuesList[i]['id']] = 'Donut Chart';
          this.chart_type[this.surveyQuesList[i]['id']]     = 'doughnut3d';
          this.legend_display[this.surveyQuesList[i]['id']] = '0';
        }
        this.getCharts();
        this.getOtherData();
      }
      else
      {

        this.isChartHidden = false;
        this.isShwSpinner  = true;
      }
    });
  }

  loadAnalyse(val: string){

    this.isShwSpinner   = false;

    this.txt_res_sur_id = val;

    this.getFeedback();
  }

  getOtherData(){

    this.isShwSpinner = false;
    this.otherData    = [];
    let temp_labels   = [];

    for(var i=0; i<this.surveyQuesList.length; i++)
    {
      if(this.surveyQuesList[i]['answer_type'] === 'Single Textbox' || this.surveyQuesList[i]['answer_type'] === 'Comment Box' || this.surveyQuesList[i]['answer_type'] === 'Date / Time')
      {
        const temp = {
                        'id': this.surveyQuesList[i]['id'],
                        'question': this.surveyQuesList[i]['question'],
                        'answer_type': this.surveyQuesList[i]['answer_type'],
                        'answers': []
                      }

        for(var l=0; l<this.surveyFeedBackList.length; l++)
        {
          if(parseInt(this.surveyFeedBackList[l]['survey_q_id']) === parseInt(this.surveyQuesList[i]['id']))
          {
            if(this.surveyQuesList[i]['answer_type'] === 'Date / Time')
            {
              let date_format = '-';

              if(this.surveyFeedBackList[l]['survey_answer'].split(':')[0] === 'DD/MM/YYYY')
              {
                date_format = 'dd/MM/yyyy';
              }
              if(this.surveyFeedBackList[l]['survey_answer'].split(':')[0] === 'MM/DD/YYYY')
              {
                date_format = 'MM/dd/yyyy';
              }

              const temp_ans = {
                                "format": date_format,
                                "info": this.surveyFeedBackList[l]['survey_answer'].split(':')[1],
                                "answer": this.surveyFeedBackList[l]['feedback_answer'],
                                "feedback_cid": this.surveyFeedBackList[l]['feedback_cid']
                              };

              temp['answers'].push(temp_ans);

              console.log(JSON.stringify(temp));

            }
            else
            {
              const temp_ans = {
                                "format": this.surveyFeedBackList[l]['survey_answer'],
                                "answer": this.surveyFeedBackList[l]['feedback_answer'],
                                "feedback_cid": this.surveyFeedBackList[l]['feedback_cid']
                              };

              temp['answers'].push(temp_ans);
            }
          }
        }

        this.otherData.push(temp);
      }

      this.isShwSpinner   = true;
    }

    if(this.otherData.length > 0 || this.fileInfoList.length > 0 || this.contactInfoList.length > 0 || this.surveyXTxtAnswer.length > 0)
    {
      this.isCDisplayData = false;
      this.isCDisplayMsg  = true;

      let doc = new jsPDF('p', 'mm', 'a4')

      doc.text(20, 20, 'Hello world!');
      doc.save('a4.pdf');
    }
    else
    {
      this.isCDisplayData = true;
      this.isCDisplayMsg  = false;
    }
  }

  loadChartType(var_chart_type, index){

    if(var_chart_type === 'Bar Chart')
    {
      this.chart_type[index]     = 'Column3d';
      this.legend_display[index] = '1';
    }
    if(var_chart_type === 'Donut Chart')
    {
      this.chart_type[index] = 'doughnut3d';
      this.legend_display[index] = '0';
    }
    if(var_chart_type === 'Pie Chart')
    {
      this.chart_type[index] = 'Pie3d';
      this.legend_display[index] = '0';
    }
  }

  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: "pdf"
    });
  }

  getCharts(){

    this.isShwSpinner     = false;
    this.isChartHidden    = false;
    this.fushionData      = [];
    this.matrixTable      = [];
    let temp_labels       = [];

    for(var i=0; i<this.surveyQuesList.length; i++)
    {
      if(this.surveyQuesList[i]['answer_type'] === 'Multiple Choice' || this.surveyQuesList[i]['answer_type'] === 'Checkboxes' || this.surveyQuesList[i]['answer_type'] === 'Dropdown' || this.surveyQuesList[i]['answer_type'] === 'Star Rating' || this.surveyQuesList[i]['answer_type'] === 'Slider')
      {
        const colorPallette = ['', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f'];

        const temp = {
                        id: this.surveyQuesList[i]['id'],
                        question: this.surveyQuesList[i]['question'],
                        answer_type: this.surveyQuesList[i]['answer_type'],
                        dataSource: {
                                      chart: {
                                        theme: "fusion",
                                        showLabels: "0",
              													showValues: "1",
              													"animateClockwise": "1",
              													legendItemFontSize: "15",
                                        legendItemFontColor: "#000000",
                                        "exportEnabled": "1",
                                        "exportFormats": "PNG=Export as PNG|JPG=Export as JPG|PDF=Export as PDF|SVG=Export as SVG",
                                        caption: this.surveyQuesList[i]['question'],
                                        "captionFontSize": "16",
                                        xaxisname: "Options",
                                        yaxisname: "Number of responses",
                                        plottooltext:
                                          "<b>$label</b>"
                                      },
                                      data: []
                                    }
                      }

        let count = 0;

        for(var l=0; l<this.surveyFeedBackList.length; l++)
        {
          if(parseInt(this.surveyFeedBackList[l]['survey_q_id']) === parseInt(this.surveyQuesList[i]['id']))
          {
            count = count + 1;

            const temp_ans = { "label": this.surveyFeedBackList[l]['survey_answer'] + '( ' + this.surveyFeedBackList[l]['feedback_answer']  + ' )',
                              "value": this.surveyFeedBackList[l]['feedback_answer'],
                              "color": colorPallette[count]
                            };

            temp['dataSource']['data'].push(temp_ans);
          }
        }
        this.fushionData.push(temp);
      }

      if(this.surveyQuesList[i]['answer_type'] === 'Ranking')
      {
        const temp = {
                        id: this.surveyQuesList[i]['id'],
                        question: this.surveyQuesList[i]['question'],
                        answer_type: this.surveyQuesList[i]['answer_type'],
                        dataSource: {
                                      chart: {
                                          theme: "fusion",
                                          showLabels: "0",
                													showValues: "1",
                													"animateClockwise": "1",
                													legendItemFontSize: "15",
                                          legendItemFontColor: "#000000",
                                          "exportEnabled": "1",
                                          "exportFormats": "PNG=Export as PNG|JPG=Export as JPG|PDF=Export as PDF|SVG=Export as SVG",
                                          caption: this.surveyQuesList[i]['question'],
                                          "captionFontSize": "16",
                                          xaxisname: "Options",
                                          yaxisname: "Number of responses",
                                          plottooltext:
                                            "<b>$label</b>"
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

            const temp_ans = { "label": this.surveyFeedBackList[l]['survey_answer'] + ' (' + this.surveyFeedBackList[l]['survey_title'] + ')',
                              "value": this.surveyFeedBackList[l]['feedback_answer'],
                              "color": colorPallette[count]
                            };

            temp['dataSource']['data'].push(temp_ans);
          }
        }
        this.fushionData.push(temp);
      }

      if(this.surveyQuesList[i]['answer_type'] === 'Matrix / Rating Scale')
      {
        const temp = {
                        id: this.surveyQuesList[i]['id'],
                        question: this.surveyQuesList[i]['question'],
                        answer_type: this.surveyQuesList[i]['answer_type'],
                        dataSource: {
                                      chart: {
                                          theme: "fusion",
  				                                "legendPosition": "right",
                													showLabels: "0",
                													showValues: "1",
                													"animateClockwise": "1",
                													legendItemFontSize: "12",
                													"chartRightMargin": "40",
                                          "exportEnabled": "1",
                                          "exportFormats": "PNG=Export as PNG|JPG=Export as JPG|PDF=Export as PDF|SVG=Export as SVG",
                                          caption: this.surveyQuesList[i]['question'],
                                          xaxisname: "Questions",
                                          yaxisname: "Number of responses",
                                      },
                                      data: []
                                    }
                      }

        const temp_tb = {
                          survey_q_id: this.surveyQuesList[i]['id'],
                          question: this.surveyQuesList[i]['question'],
                          data: []
                        }

        const colorPallette = ['', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f', '#21b25b', '#1c2a33','#8bf2b4','#58e791','#1d455f'];

        let count = 0;

        for(var l=0; l<this.surveyFeedBackList.length; l++)
        {
          if(parseInt(this.surveyFeedBackList[l]['survey_q_id']) === parseInt(this.surveyQuesList[i]['id']))
          {
            count = count + 1;

            const temp_ans = { "label": this.surveyFeedBackList[l]['survey_answer'] + ' (' + this.surveyFeedBackList[l]['survey_title'] + ')',
                              "value": this.surveyFeedBackList[l]['feedback_answer'],
                              "color": colorPallette[count]
                            };

            const temp_tb_ans = {
                              "survey_q_id": this.surveyQuesList[i]['id'],
                              "label": this.surveyFeedBackList[l]['survey_answer'],
                              "col_value": this.surveyFeedBackList[l]['survey_title'],
                              "value": this.surveyFeedBackList[l]['feedback_answer']
                            };

            temp['dataSource']['data'].push(temp_ans);

            temp_tb['data'].push(temp_tb_ans);
          }
        }
        this.fushionData.push(temp);
        this.matrixTable.push(temp_tb['data']);
        console.log(JSON.stringify(this.matrixTable));
      }

      if(this.fushionData.length > 0)
      {
        this.isODisplayMsg  = true;
        this.isODisplayData = false;
      }
      else
      {
        this.isODisplayMsg  = false;
        this.isODisplayData = true;
      }

      this.isShwSpinner   = true;

      const data_dump = {
                          chart: {
                                  theme: "fusion",
                                  "legendPosition": "bottom",
                                  showLabels: "0",
                                  showValues: "1",
                                  "animateClockwise": "1",
                                  legendItemFontSize: "12",
                                  "chartRightMargin": "40",
                                  "exportEnabled": "1",
                                  "exportFormats": "PNG=Export as PNG|JPG=Export as JPG|PDF=Export as PDF|SVG=Export as SVG",
                                  caption: 'Summary report of ' + this.txt_res_sur_title,
                                  xaxisname: "Questions",
                                  yaxisname: "Number of responses",
                                  plottooltext:
                                    "<b>$label</b>"
                                },
                                data: []
                        }

      for(var x=0; x<this.fushionData.length; x++)
      {
         let total_reponse = 0;

         for(var j=0; j<this.fushionData[x]['dataSource']['data'].length; j++)
         {
           total_reponse = total_reponse + parseInt(this.fushionData[x]['dataSource']['data'][j]['value']);
         }

         const dump_data = {
                              label: this.fushionData[x]['question'] + '( ' + total_reponse  + ')',
                              value: total_reponse
                          };

          data_dump['data'].push(dump_data);
      }

      this.dataSource = data_dump;
    }
  }

  exportAll()
  {
    let chart_ids = [{id: 'chartobject-' + (this.fushionData.length+1)}];

    for(var i=0; i<this.fushionData.length; i++)
    {
      const temp = {id: 'chartobject-' + (i+1)};

      chart_ids.push(temp);
    }

    console.log(JSON.stringify(chart_ids));

    FusionCharts.batchExport({
      charts: chart_ids,
      exportFileName: "batchExport",
      exportFormat: "pdf",
      exportAtClientSide: "1"
    });
  }

}

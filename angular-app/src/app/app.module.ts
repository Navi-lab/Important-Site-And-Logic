import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { RecaptchaModule } from 'angular-google-recaptcha';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FaqComponent } from './faq/faq.component';
import { DraftComponent } from './draft/draft.component';
import { HistoryComponent } from './history/history.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CategoryPipe } from './category.pipe';
import { ServicePipe } from './service.pipe';
import { SurveyDesignComponent } from './survey-design/survey-design.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';
import { SurveyEmailComponent } from './survey-email/survey-email.component';
import { SurveySubmitComponent } from './survey-submit/survey-submit.component';
import { ResultComponent } from './result/result.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookieComponent } from './cookie/cookie.component';
import {MatTabsModule} from '@angular/material/tabs';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FaqPipe } from './faq.pipe';
import { BarRatingModule } from "ngx-bar-rating";
import {DatePipe} from '@angular/common';
import { TemplatePipe } from './template.pipe';
import { ContactPipe } from './contact.pipe';

import { FusionChartsModule } from "angular-fusioncharts";
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as ExcelExport from "fusioncharts/fusioncharts.excelexport";

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, ExcelExport);

import { TemplateComponent } from './template/template.component';
import { TempcategoryPipe } from './tempcategory.pipe';
import { TempanswerPipe } from './tempanswer.pipe';
import { FromHistoryComponent } from './from-history/from-history.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SurveyManualComponent } from './survey-manual/survey-manual.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SortPipe } from './sort.pipe';
import { SortByPipe } from './sort-by.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { CopyHistoryComponent } from './copy-history/copy-history.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PagerService } from './index';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { ExportAsModule } from 'ngx-export-as';
import { TableFilterPipe } from './table-filter.pipe';
import { GroupFilterPipe } from './group-filter.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BulkSmsComponent } from './bulk-sms/bulk-sms.component';
import { ContactFilterPipe } from './contact-filter.pipe';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { jqxTabsModule } from 'jqwidgets-ng/jqxtabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FeedbackComponent } from './feedback/feedback.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    DashboardComponent,
    AnalyticsComponent,
    FaqComponent,
    DraftComponent,
    HistoryComponent,
    ContactComponent,
    AboutComponent,
    CategoryPipe,
    ServicePipe,
    SurveyDesignComponent,
    SurveyPreviewComponent,
    SurveyEmailComponent,
    SurveySubmitComponent,
    ResultComponent,
    PrivacyComponent,
    CookieComponent,
    FaqPipe,
    TemplatePipe,
    ContactPipe,
    TemplateComponent,
    TempcategoryPipe,
    TempanswerPipe,
    FromHistoryComponent,
    SurveyManualComponent,
    SortPipe,
    SortByPipe,
    CopyHistoryComponent,
    CreateSurveyComponent,
    TableFilterPipe,
    GroupFilterPipe,
    BulkSmsComponent,
    ContactFilterPipe,
    FeedbackComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatRadioModule,
    MatChipsModule,
    MatListModule,
    SelectDropDownModule,
    AngularFontAwesomeModule,
    MatCheckboxModule,
    MatCarouselModule,
    MatExpansionModule,
    MatSliderModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    BarRatingModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    OrderModule,
    EditorModule,
    ExportAsModule,
    RecaptchaModule.forRoot({
        siteKey: '6LepdbQUAAAAAKMBun1tx8du_CzRy62Gj5tDns0O',
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    FusionChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSlideToggleModule,
    jqxChartModule,
    jqxTabsModule,
    MatTooltipModule
  ],
  providers: [  DatePipe,
                PagerService],
  bootstrap: [AppComponent]
})
export class AppModule {}

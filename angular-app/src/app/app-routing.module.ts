import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FaqComponent } from './faq/faq.component';
import { DraftComponent } from './draft/draft.component';
import { HistoryComponent } from './history/history.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SurveyDesignComponent } from './survey-design/survey-design.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';
import { SurveyEmailComponent } from './survey-email/survey-email.component';
import { SurveySubmitComponent } from './survey-submit/survey-submit.component';
import { ResultComponent } from './result/result.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TemplateComponent } from './template/template.component';
import { FromHistoryComponent } from './from-history/from-history.component';
import { SurveyManualComponent } from './survey-manual/survey-manual.component';
import { CopyHistoryComponent } from './copy-history/copy-history.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { BulkSmsComponent } from './bulk-sms/bulk-sms.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
	{path:"welcome-page", component: WelcomePageComponent},
	{path:"dashboard", component: DashboardComponent},
	{path:"faq", component: FaqComponent},
	{path:"analytics", component: AnalyticsComponent},
	{path:"draft", component: DraftComponent},
	{path:"history", component: HistoryComponent},
	{path:"contact", component: ContactComponent},
	{path:"about", component: AboutComponent},
	{path:"survey-design", component: SurveyDesignComponent},
	{path:"survey-preview", component: SurveyPreviewComponent},
	{path:"survey-email", component: SurveyEmailComponent},
	{path:"bulk-upload", component: SurveySubmitComponent},
	{path:"result", component: ResultComponent},
	{path:"cookie", component: CookieComponent},
	{path:"privacy", component: PrivacyComponent},
	{path:"template", component: TemplateComponent},
	{path:"from-history", component: FromHistoryComponent},
	{path:"survey-manual", component: SurveyManualComponent},
	{path:"copy-history", component: CopyHistoryComponent},
	{path:"create-survey", component: CreateSurveyComponent},
	{path:"bulk-sms", component: BulkSmsComponent},
	{path:"feedback", component: FeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

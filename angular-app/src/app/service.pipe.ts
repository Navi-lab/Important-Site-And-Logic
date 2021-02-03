import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'survey'
})
export class ServicePipe implements PipeTransform {

  	transform(surveyAns: Array<any>, ques_id: number): Array<any> {
        return surveyAns.filter(ans => ans.survey_q_id === ques_id);
    }

}

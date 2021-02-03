import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'contact'
})
export class ContactPipe implements PipeTransform {

  transform(contactInfoList: Array<any>, ques_id: number): Array<any> {
        return contactInfoList.filter(ans => ans.survey_q_id === ques_id);
    }


} 

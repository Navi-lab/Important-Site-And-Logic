import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(surveyList: Array<any>, sur_category: string): Array<any> {
        return surveyList.filter(res => res.survey_category === sur_category);
    }
 
}

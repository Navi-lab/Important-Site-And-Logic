import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'tempcategory'
})
export class TempcategoryPipe implements PipeTransform {

  	transform(templateList: Array<any>, sur_category: string): Array<any> {
        return templateList.filter(res => res.survey_category === sur_category);
    }
}

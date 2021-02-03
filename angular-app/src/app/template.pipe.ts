import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'template'
})
export class TemplatePipe implements PipeTransform {
	transform(quesAnswerList: Array<any>, template_id: number): Array<any> {
        return quesAnswerList.filter(ans => ans.template_q_id === template_id);
    }

}
 
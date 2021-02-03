import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempanswer'
})
export class TempanswerPipe implements PipeTransform {

	transform(templateAns: Array<any>, ques_id: number): Array<any> {
        return templateAns.filter(ans => ans.template_q_id === ques_id);
    }

} 

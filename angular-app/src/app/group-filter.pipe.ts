import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupFilter'
})
export class GroupFilterPipe implements PipeTransform {

  	transform(addedQuesList: Array<any>, grp_name: string): Array<any> {
        return addedQuesList.filter(ans => ans.question_section_name === grp_name);
    }
} 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faq'
})
export class FaqPipe implements PipeTransform {

  transform(content: Array<any>, title: number): Array<any> {
        return content.filter(ans => ans.title === title);
    }

} 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

	transform(tabRowList: Array<any>, col_id: number): Array<any> {
		return tabRowList.filter(res => res.survey_grade_id === col_id);
	}

}

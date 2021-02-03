import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(contactInfoList: Array<any>, col_id: string): Array<any> {
		return contactInfoList.filter(res => res.contact_info_label === col_id);
	}

}

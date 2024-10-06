import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: any[], field: string): any[] {
    if(!value || !field) {
      return value;
    }
    return value.sort((a, b) => {
      const nameA = a[field].toLowerCase();
      const nameB = b[field].toLowerCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'integerFormat',
  standalone: true
})
export class IntegerFormatPipe implements PipeTransform {

  transform(value: number | undefined): number | null {

    if(value === undefined) {
      return null;
    }
    
    return Math.round(value);
  }

}

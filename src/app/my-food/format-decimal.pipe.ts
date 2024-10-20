import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDecimal',
  standalone: true
})
export class FormatDecimalPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === undefined) {
      return '';
    }
    return value.toFixed(2).replace('.', ',');
  }
  
  /* 
  transform(value: number | string): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
      return '';
    }

    return numValue.toFixed(2).replace('.', ',');
  } */
}

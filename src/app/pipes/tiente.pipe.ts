import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiente',
})
export class TientePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}

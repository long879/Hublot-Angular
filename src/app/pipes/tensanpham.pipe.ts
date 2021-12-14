import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tensanpham',
})
export class TensanphamPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.length >= 15) {
      return value.substr(0, 15) + '...';
    } else {
      return value;
    }
  }
}

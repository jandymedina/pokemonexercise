import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetter'
})
export class CapitalLetterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value.length) {
      return value;
    }
    return value.charAt(0).toUpperCase()+value.slice(1);
  }
}

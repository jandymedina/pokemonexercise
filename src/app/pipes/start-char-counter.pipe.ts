import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'startCharCounter'
})
export class StartCharCounterPipe implements PipeTransform {
  transform(value: any[], ...args: unknown[]): any[] {
    if (!value.length) {
      return value;
    }
    const iniciales = value
      .map(valor => {
        return {...valor, name: valor.name.charAt(0).toUpperCase()};
      })
      .reduce((prev, cur) => {
        if (prev.length && prev.find((element: any) => element.name === cur.name)) {
          const index = prev.findIndex((element: any) => element.name === cur.name);
          prev[index].cantidad++;
        } else {
          prev.push({name: cur.name, cantidad: 1});
        }
        return prev;
      }, [])
      .sort((a: any, b: any) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    return iniciales;
  }

}

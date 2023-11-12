import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[onlyLeter]'
})
export class OnlyLeterDirective {

  constructor(private readonly elRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onChangeInput(event:Event){
    const leterRegExp = /[^A-Z,a-z]*/g;

    const value = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = value.replace(leterRegExp, '');
    if(value !== this.elRef.nativeElement.value){
      event.stopPropagation();
    }
  }

}

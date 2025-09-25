import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  clickOutside = output<void>();
  elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

  constructor() {}
}

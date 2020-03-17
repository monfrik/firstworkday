import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[tmDisableControl]',
})
export class DisableControlDirective {

  @Input() set tmDisableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor(private readonly ngControl: NgControl) {
  }

}

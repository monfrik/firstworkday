import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IErrorTemplate } from '@core/interfaces';

@Component({
  selector: '[error-filed]',
  templateUrl: './error-filed.component.html',
})

export class ErrorFiledComponent {

  @Input()
  public inputControl: FormControl;

  @Input()
  public errorMessages: object = {};

  public get errorTemplates(): IErrorTemplate[] {
    const errorKeys = Object.keys(this.errorMessages);
    return errorKeys.map((error) => {
      return {
        error,
        message: this.errorMessages[error],
      };
    });
  }

  public trackByFn(index: number): number {
    return index;
  }

}

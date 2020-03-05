import {
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFormsGroup } from '@app/users/interfaces';


@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormStepperComponent implements OnDestroy {

  @Input()
  public formGroup: FormGroup;

  @Input()
  set activeTab(activeTab: boolean) {
    if (!activeTab) {
      this._patchUser();
    }
  }

  @Output()
  public readonly submitStepper = new EventEmitter<IFormsGroup>();

  @Output()
  public readonly patchFormStepper = new EventEmitter<IFormsGroup>();

  public isPending = false;

  constructor() {}

  get submitColor(): string {
    return this.formGroup.invalid && (this.formGroup.dirty || this.formGroup.touched)
    ? 'warn'
    : '';
  }

  public ngOnDestroy(): void {
    this._patchUser();
  }

  public submit(): void {
    if (this.formGroup && this.formGroup.valid) {
      this.isPending = true;
      this.submitStepper.emit(this.formGroup.value);
    }
  }

  private _patchUser(): void {
    if (this.formGroup && this.formGroup.touched) {
      this.patchFormStepper.emit(this.formGroup.value);
    }
  }

}

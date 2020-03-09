import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import { PHONE_MASK, ZIPCODE_MASK, STATES } from '@app/utils';
import { IFormsGroup } from '@app/users/interfaces';


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormListComponent implements OnDestroy {

  @Input()
  public formGroup: FormGroup;

  @Input()
  set activeTab(activeTab: boolean) {
    if (!activeTab) {
      this._patchUser();
    }
  }

  @Output()
  public readonly submitList = new EventEmitter<IFormsGroup>();

  @Output()
  public readonly patchFormList = new EventEmitter<IFormsGroup>();

  public phoneMask: (string | RegExp)[] = PHONE_MASK;
  public zipcodeMask: (string | RegExp)[] = ZIPCODE_MASK;
  public states = STATES;
  public isPending = false;

  constructor() {}

  public get personalInfoForm(): AbstractControl {
    return this.formGroup.get('personalInfoForm');
  }

  public get addressInfoForm(): AbstractControl {
    return this.formGroup.get('addressInfoForm');
  }

  public get additionalInfoForm(): AbstractControl {
    return this.formGroup.get('additionalInfoForm');
  }

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
      this.submitList.emit(this.formGroup.value);
    }
  }

  public onChangeSelect(stateName: string): void {
    const currentState = STATES.find((state) => state.name === stateName);
    this.addressInfoForm.get('stateshort').patchValue(currentState.shortname);
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _patchUser(): void {
    if (this.formGroup && this.formGroup.touched) {
      this.patchFormList.emit(this.formGroup.value);
    }
  }

}

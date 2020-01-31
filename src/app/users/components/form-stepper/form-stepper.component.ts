import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UserValidator } from '@core/validators/user-validator';
import { AddressValidator } from '@core/validators/address-validator';
import { StateValidator } from '@core/validators/state-validator';


@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
})

export class FormStepperComponent implements OnInit {

  @Input()
  public formGroup: FormGroup;

  @Output()
  public updateStepper: EventEmitter<void> = new EventEmitter();

  @Output()
  public submitStepper: EventEmitter<void> = new EventEmitter<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._formInitialization();
    this._onValueChanges();
  }

  private _onValueChanges(): void {
    this.formGroup.valueChanges
      .subscribe( data => {
        this.updateStepper.emit(data);
      });
  }

  private _formInitialization(): void {
    this.formGroup.addControl('firstFormGroup', this._formBuilder.group({
      firstname: ['', [Validators.required, UserValidator.nameValidator]],
      lastname: ['', [Validators.required, UserValidator.nameValidator]],
      phone: ['', [Validators.required, UserValidator.phoneValidator]],
      email: ['', [Validators.required, UserValidator.emailValidator]],
    }));

    this.formGroup.addControl('secondFormGroup', this._formBuilder.group({
      state: ['', [Validators.required, StateValidator.nameValidator]],
      stateShort: ['', [Validators.required, StateValidator.shortnameValidator]],
      city: ['', [Validators.required, AddressValidator.cityValidator]],
      street: ['', [Validators.required, AddressValidator.streetValidator]],
      zipcode: ['', [Validators.required, AddressValidator.zipcodeValidator]],
    }));

    this.formGroup.addControl('thirdFormGroup', this._formBuilder.group({
      avatar: [null, [Validators.required, FileUploadValidators.filesLimit(1)]],
    }));
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

import {
  NAME_PATTERN,
  PHONE_PATTERN,
  EMAIL_PATTERN,
  CITY_PATTERN,
  STREET_PATTERN,
  ZIPCODE_PATTERN,
  STATE_PATTERN,
  STATE_SHORT_PATTERN,
} from '@utils';

import { UserModel } from '@app/users/models';

import { IFormStepperData } from './interfaces';


@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormStepperComponent implements OnInit, OnDestroy {

  @Input()
  set user(user: UserModel) {
    if (!user) {
      return;
    }

    if (this.formGroup) {
      this._formUpdate(user);
    } else {
      this._initialUserData = user;
    }
  }

  @Input()
  set activeTab(activeTab: boolean) {
    if (!activeTab) {
      this._patchUser();
    }
  }

  @Output()
  public readonly submitStepper = new EventEmitter<UserModel>();

  @Output()
  public readonly patchFormStepper = new EventEmitter<UserModel>();

  public formGroup: FormGroup;
  public firstGroupForm: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  private _destroy$ = new Subject<void>();
  private _initialUserData: UserModel;
  private _submited = false;

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._formInitialization();
    if (this._initialUserData) {
      this._formUpdate(this._initialUserData);
    }
  }

  public ngOnDestroy(): void {
    this._patchUser();
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submit(): void {
    if (this.formGroup.valid) {
      this._submited = true;
      const newUser = this._convertToModel(this.formGroup.value);
      this.submitStepper.emit(newUser);
    }
  }

  private _patchUser(): void {
    if (this.formGroup && this.formGroup.touched && !this._submited) {
      this.patchFormStepper.emit(this._convertToModel(this.formGroup.value));
    }
  }

  private _convertToModel (formData: IFormStepperData): UserModel {
    return new UserModel({
      firstname: formData.firstFormGroup.firstname,
      lastname: formData.firstFormGroup.lastname,
      phone: formData.firstFormGroup.phone,
      email: formData.firstFormGroup.email,
      birthday: formData.firstFormGroup.birthday,
      address: {
        state: {
          name: formData.secondFormGroup.name,
          shortname: formData.secondFormGroup.shortname,
        },
        city: formData.secondFormGroup.city,
        street: formData.secondFormGroup.street,
        zipcode: formData.secondFormGroup.zipcode,
      },
      avatar: formData.thirdFormGroup.avatar,
    });
  }

  private _formUpdate(data: UserModel): void {
    this.formGroup.patchValue({
      firstFormGroup: {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        birthday: data.birthday,
      },
      secondFormGroup: {
        name: data.address.state.name,
        shortname: data.address.state.shortname,
        city: data.address.city,
        street: data.address.street,
        zipcode: data.address.zipcode,
      },
      thirdFormGroup: {
        avatar: data.avatar,
      },
    });
  }

  private _formInitialization(): void {
    this.firstGroupForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      birthday: ['', [Validators.required]],
    });

    this.secondFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(STATE_PATTERN)]],
      shortname: ['', [Validators.required, Validators.pattern(STATE_SHORT_PATTERN)]],
      city: ['', [Validators.required, Validators.pattern(CITY_PATTERN)]],
      street: ['', [Validators.required, Validators.pattern(STREET_PATTERN)]],
      zipcode: ['', [Validators.required, Validators.pattern(ZIPCODE_PATTERN)]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      avatar: [null],
    });

    this.formGroup = this._formBuilder.group({
      firstFormGroup: this.firstGroupForm,
      secondFormGroup: this.secondFormGroup,
      thirdFormGroup: this.thirdFormGroup,
    });
  }

}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { Subject } from 'rxjs';

import {
  PHONE_MASK,
  ZIPCODE_MASK,

  NAME_PATTERN,
  PHONE_PATTERN,
  EMAIL_PATTERN,
  CITY_PATTERN,
  STREET_PATTERN,
  ZIPCODE_PATTERN,
  STATE_PATTERN,
  STATE_SHORT_PATTERN,
  STATES,
} from '@utils';

import { UserModel } from '@app/users/models';


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormListComponent implements OnInit, OnDestroy {

  @Input()
  set user(user: UserModel) {
    if (!user) {
      return;
    }

    if (this.formGroup) {
      this.formGroup.patchValue(user);
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
  public readonly submitList = new EventEmitter<UserModel>();

  @Output()
  public readonly patchFormList = new EventEmitter<UserModel>();

  public phoneMask: (string | RegExp)[] = PHONE_MASK;
  public zipcodeMask: (string | RegExp)[] = ZIPCODE_MASK;
  public states = STATES;

  public formGroup: FormGroup;

  private _destroy$ = new Subject<void>();
  private _initialUserData: UserModel;
  private _submited = false;

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) {}

  public get address(): AbstractControl {
    return this.formGroup.get('address');
  }

  public get state(): AbstractControl {
    return this.formGroup.get('address').get('state');
  }

  public ngOnInit(): void {
    this._formInitialization();
    if (this._initialUserData) {
      this.formGroup.patchValue(this._initialUserData);
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
      this.submitList.emit(new UserModel(this.formGroup.value));
    }
  }

  public onChangeSelect(stateName: string): void {
    const currentState = STATES.find((state) => state.name === stateName);
    this.state.get('shortname').patchValue(currentState.shortname);
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _patchUser(): void {
    if (this.formGroup && this.formGroup.touched && !this._submited) {
      this.patchFormList.emit(new UserModel(this.formGroup.value));
    }
  }

  private _formInitialization(): void {
    this.formGroup = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      // avatar: [null, [Validators.required, FileUploadValidators.filesLimit(1)]],
      avatar: [null, []],
      birthday: ['', [Validators.required]],
      address: this._formBuilder.group({
        state: this._formBuilder.group({
          name: ['', [Validators.required, Validators.pattern(STATE_PATTERN)]],
          shortname: ['', [Validators.required, Validators.pattern(STATE_SHORT_PATTERN)]],
        }),
        city: ['', [Validators.required, Validators.pattern(CITY_PATTERN)]],
        street: ['', [Validators.required, Validators.pattern(STREET_PATTERN)]],
        zipcode: ['', [Validators.required, Validators.pattern(ZIPCODE_PATTERN)]],
      }),
    });
  }

}

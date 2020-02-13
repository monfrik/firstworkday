import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UsersService } from '@app/users/services';
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
} from '@app/utils';

import { UserModel } from '@app/users/models';

interface ControlData {
  control: AbstractControl;
  key: string;
  source: 'stepper' | 'list' | 'service';
  callback?: Function;
}


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormListComponent implements OnInit {

  public phoneMask: (string | RegExp)[] = PHONE_MASK;
  public zipcodeMask: (string | RegExp)[] = ZIPCODE_MASK;

  public states = STATES;

  public formGroup: FormGroup;

  private _destroyed$ = new Subject<void>();
  
  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _usersService: UsersService,
  ) {}

  public get address() {
    return this.formGroup.get('address');
  }

  public get state() {
    return this.formGroup.get('address').get('state');
  }

  public ngOnInit(): void {
    this._formInitialization();
    this._onValueChanges();
    this._getValueChanges();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public submit(): void {
    // this.submitList.emit();
  }

  public onChangeSelect(stateName): void {
    const currentState = STATES.find(element => element.name === stateName);
    this.state.get('shortname').patchValue(currentState.shortname);
  }

  private _onValueChanges(): void {
    // this.formGroup.valueChanges
    //   .subscribe({
    //     next: (formData) => {
    //       console.log('FormListComponent _onValueChanges', formData);
    //       this._usersService
    //         .patchUserForm(new UserModel(formData), 'list');
    //     }
    //   });
    // this._controlListener(this.formGroup.get('firstname'), 'list')
    // this.formGroup.get('firstname');
    const source = 'list';
    this._controlListener({
      control: this.formGroup.get('firstname'),
      key: 'firstname',
      source
    });
    this._controlListener({
      control: this.formGroup.get('lastname'),
      key: 'lastname',
      source
    });
    this._controlListener({
      control: this.formGroup.get('phone'),
      key: 'phone',
      source
    });
    this._controlListener({
      control: this.formGroup.get('email'),
      key: 'email',
      source
    });
    this._controlListener({
      control: this.formGroup.get('birthday'),
      key: 'birthday',
      source
    });
    this._controlListener({
      control: this.formGroup.get('avatar'),
      key: 'avatar',
      source
    });
    this._controlListener({
      control: this.state.get('name'),
      key: 'state',
      source,
      callback: value => STATES.find(element => element.name === value),
    });
    this._controlListener({
      control: this.state.get('city'),
      key: 'city',
      source
    });
    this._controlListener({
      control: this.state.get('street'),
      key: 'city',
      source
    });
    this._controlListener({
      control: this.state.get('zipcode'),
      key: 'zipcode',
      source
    });
  }

  private _controlListener(controlParams: ControlData): void {
    controlParams.control
      .valueChanges
      .pipe(
        takeUntil(this._destroyed$),
      )
      .subscribe({
        next: (value) => {
          let patchValue;
          if (controlParams.callback) {
            patchValue = controlParams.callback(value);
          } else {
            patchValue = {[controlParams.key]: value};
          }
          this._usersService
            .patchUserForm(patchValue, controlParams.source);
        }
      });
  }

  private _getValueChanges(): void {
    this._usersService.userFormData$
      .pipe(
        filter(data => data.source !== 'list')
      )
      .subscribe({
        next: (data) => {
          console.log('FormListComponent _getValueChanges', data.userData)
          // this.formGroup.patchValue(data.userData, {
          //   emitEvent: false,
          // });
        }
      })
  }

  private _formInitialization(): void {
    this.formGroup = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      avatar: [null, [Validators.required, FileUploadValidators.filesLimit(1)]],
      birthday: ['', [Validators.required]],
      address: this._formBuilder.group({
        state: this._formBuilder.group({
          name: ['', [Validators.required, Validators.pattern(STATE_PATTERN)]],
          shortname: ['', [Validators.required, Validators.pattern(STATE_SHORT_PATTERN)]],
        }),
        city: ['', [Validators.required, Validators.pattern(CITY_PATTERN)]],
        street: ['', [Validators.required, Validators.pattern(STREET_PATTERN)]],
        zipcode: ['', [Validators.required, Validators.pattern(ZIPCODE_PATTERN)]],
      })
    })
  }

}

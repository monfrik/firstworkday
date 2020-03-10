import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  getCountries,
  AsYouType,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';


@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    }
  ]
})
export class PhoneInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  public formGroup: FormGroup;
  public disableControl = true;
  public readonly countries = getCountries();
  
  private _destroy$ = new Subject<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this._initForm();
    this._formSubsribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public writeValue(phone: string): void {
    this.onChange(phone);
  }
  
  public registerOnChange(fn): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }
  
  public onChange(_): any { }
  public onTouched(): any { }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      phone: [{value: '', disabled: true}, this._phoneValidator()],
      country: [''],
    })
  }

  private _formSubsribe(): void {
    this.formGroup.get('phone').valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._onUpdatePhone();
      });

    this.formGroup.get('country').valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.disableControl = false;
      });
  }

  private _onUpdatePhone(): void {
    const phone = this.formGroup.get('phone').value;
    const country = this.formGroup.get('country').value;

    const asYouType = new AsYouType(country);
    const phoneAsType = asYouType.input(phone);

    this.formGroup.patchValue({phone: phoneAsType}, {
      emitEvent: false,
    });

    if (phoneAsType) {
      const parsePhone = parsePhoneNumberFromString(phoneAsType, country);
      if (parsePhone) {
        this.writeValue(parsePhone.number as string);
      }
    }
  }

  private _phoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const country = this.formGroup.get('country').value;
      const parsePhone = parsePhoneNumberFromString(control.value, country);
      if (!parsePhone || !parsePhone.isValid()) {
        return {phonePattern: true};
      }

      return null;
    };
  }

}

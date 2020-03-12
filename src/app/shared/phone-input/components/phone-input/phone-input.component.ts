import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  OnDestroy,
  Input,
  Self,
  Optional,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
  ValidatorFn,
  NgControl,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  getCountries,
  AsYouType,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  getExampleNumber,
  CountryCode,
} from 'libphonenumber-js';


interface IPhoneCountryFormat {
  country: string;
  callingCode: string
}

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

  @Input()
  public get value() {return this.value}
  public set value(value) {
    this._value = value;
    this._controlValueAccessorChangeFn(value);
  }

  public formGroup: FormGroup;
  public disableControl = true;

  public readonly countries: CountryCode[] = getCountries();
  public countryFormats: IPhoneCountryFormat[];
  
  private _value: string;
  private _destroy$ = new Subject<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._initForm();
    this._formSubsribe();
    this._getCollingCodes();

    // this.countries.forEach((element: any): void => {
    //   const asYouType = new AsYouType(element);
    //   console.group('country', element);
    //   console.log('country calling code = ', getCountryCallingCode(element));
    //   console.log('country phone example = ', getExampleNumber(element, examples).number);
    //   console.groupEnd();
    // });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public writeValue(phone: string): void {
    this.value = phone;

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
      countryFormat: [null],
    })
  }

  private _formSubsribe(): void {
    this.formGroup.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((formValue) => {
        if (formValue.countryFormat && formValue.phone) {
          this._changePhone(formValue);
        }
      });

    this.formGroup.get('countryFormat').valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((value) => {
        this.disableControl = !value;
      });
  }

  private _changePhone(formValue): void {
    const asYouType = new AsYouType(formValue.countryFormat.country);
    const phoneAsType = asYouType.input(formValue.phone);

    this.formGroup.patchValue({phone: phoneAsType}, {
      emitEvent: false,
    });

    if (phoneAsType) {
      const parsePhone = parsePhoneNumberFromString(phoneAsType, formValue.countryFormat.country);
      if (parsePhone) {
        this.writeValue(parsePhone.number as string);
      }
    }
  }

  private _getCollingCodes(): void {
    const countryFormats: IPhoneCountryFormat[] = [];

    this.countries.forEach((country: CountryCode) => {
      const callingCode = `+${getCountryCallingCode(country)}`;
      countryFormats.push({country, callingCode});
    });

    this.countryFormats = countryFormats;
  }
    
  private _phoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const countryFormat = this.formGroup.get('countryFormat').value;
      if (!countryFormat) {
        return {phonePattern: true};
      }

      const phone = `${countryFormat.callingCode} ${control.value}`;
      const parsePhone = parsePhoneNumberFromString(phone, countryFormat.county);
      if (!parsePhone || !parsePhone.isValid()) {
        return {phonePattern: true};
      }

      return null;
    };
  }

  private _controlValueAccessorChangeFn(value) {
    const countryFormatControl = this.formGroup.get('countryFormat');
    if (!this.formGroup || countryFormatControl.value || !value) {
      return;
    }

    const parsePhone =  (value);
    console.log(parsePhone);
    console.log(parsePhone.country);
    // this.formGroup.patchValue({
    //   phone: value,
    // })
    console.log('__value', value)
  }

}

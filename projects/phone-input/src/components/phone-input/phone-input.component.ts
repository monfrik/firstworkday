import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';

import {
  getCountries,
  AsYouType,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  CountryCode,
  findPhoneNumbersInText,
} from 'libphonenumber-js';

import { IPhoneCountryFormat } from '../../interfaces';


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
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ]
})
export class PhoneInputComponent implements OnInit, ControlValueAccessor, Validator {

  @Input()
  public get value() {return this._value;}
  public set value(value) {
    this._value = value;
    this._controlValueAccessorChangeFn(value);
  }

  public countryFormats: IPhoneCountryFormat[];
  
  private _value: string;
  private _phone: string;
  private _countryFormat: IPhoneCountryFormat;

  private readonly countries: CountryCode[] = getCountries();

  public constructor(
    private readonly _changeDetector: ChangeDetectorRef,
  ) {}

  public get phone() {return this._phone}
  public set phone(value) {
    this._changePhone(value);
  }

  public get countryFormat() {return this._countryFormat}
  public set countryFormat(value) {
    this._countryFormat = value;
    if (value) {
      this._changePhone(this.phone);
      return;
    }

    this._phone = null;
  }

  public ngOnInit(): void {
    this._getCollingCodes();
  }

  public writeValue(phone: string): void {
    this.value = phone;
    this.onChange(phone);
  }

  public validate() {
    if (!this.phone || !this.countryFormat) {
      return {phonePattern: true};
    }

    const phone = `${this.countryFormat.callingCode} ${this.phone}`;
    const parsePhone = parsePhoneNumberFromString(phone, this.countryFormat.country);

    console.groupEnd();
    if (!parsePhone || !parsePhone.isValid()) {
      return {phonePattern: true};
    }

    return null;
}
  
  public registerOnChange(fn): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }
  
  public onChange(_): any { }
  public onTouched(): any { }

  private _changePhone(phone = ''): void {
    const country = this.countryFormat.country;
    const asYouType = new AsYouType(country);
    const phoneAsType = asYouType.input(phone);
    this._phone = phoneAsType;

    if (!phoneAsType) {
      this.writeValue('');
      return;
    }
    
    const parsePhone = parsePhoneNumberFromString(phoneAsType, country);
    if (!parsePhone) {
      this.writeValue('');
      return;
    }

    this.writeValue(parsePhone.number as string);
  }

  private _getCollingCodes(): void {
    const countryFormats: IPhoneCountryFormat[] = [];

    this.countries.forEach((country: CountryCode) => {
      const callingCode = `+${getCountryCallingCode(country)}`;
      countryFormats.push({country, callingCode});
    });

    this.countryFormats = countryFormats;
  }
    
  private _controlValueAccessorChangeFn(value): void {
    if (this.countryFormat || !value) {
      return;
    }

    const phoneNumbers = findPhoneNumbersInText(value);
    const currentPhone = phoneNumbers[0];
    if (!currentPhone) {
      return
    }

    this._countryFormat = {
      country: currentPhone.number.country,
      callingCode: '+' + currentPhone.number.countryCallingCode,
    } as IPhoneCountryFormat;
    this.phone = currentPhone.number.nationalNumber as string;
    this._changeDetector.detectChanges();
  }

}

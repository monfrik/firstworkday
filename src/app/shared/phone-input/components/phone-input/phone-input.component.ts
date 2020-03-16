import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding,
  Self,
  Optional,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  MatFormFieldControl,
  ErrorStateMatcher,
  CanDisableCtor,
  CanUpdateErrorStateCtor,
  CanDisable,
  CanUpdateErrorState,
  mixinDisabled,
  mixinErrorState,
} from '@angular/material';

import { Subject } from 'rxjs';

import {
  AsYouType,
  CountryCode,
  getCountries,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  findPhoneNumbersInText,
} from 'libphonenumber-js';

import { IPhoneCountryFormat } from '../../interfaces';


class PhoneInputComponentBase {

  constructor(
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {}

}

const PhoneInputComponentMixinBase: CanDisableCtor & CanUpdateErrorStateCtor =
  mixinDisabled(mixinErrorState(PhoneInputComponentBase));

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MatFormFieldControl, useExisting: PhoneInputComponent}],
})
export class PhoneInputComponent
  extends PhoneInputComponentMixinBase
  implements OnInit, OnDestroy,
  MatFormFieldControl<string>, ControlValueAccessor, CanDisable, CanUpdateErrorState {

  public static nextId = 0;

  @Input()
  public get value(): string { return this._value; }
  public set value(value: string) {
    this._value = value;
    this.stateChanges.next();
    this._controlValueAccessorChangeFn(value);
  }
  private _value: string;

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }
  private _required = false;

  @HostBinding()
  public id = `phone-input-${PhoneInputComponent.nextId++}`;

  @HostBinding('attr.aria-describedby')
  public describedBy = '';

  public focused = false;
  
  public controlType = 'app-phone-input';
  
  public countryFormats: IPhoneCountryFormat[];
  
  public readonly stateChanges = new Subject<void>();

  private _phone: string;
  private _countryFormat: IPhoneCountryFormat;

  public formControl = new FormControl('');

  private readonly countries: CountryCode[] = getCountries();

  public constructor(
    public readonly defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() public readonly parentForm: NgForm,
    @Optional() public readonly parentFormGroup: FormGroupDirective,
    @Optional() @Self() public readonly ngControl: NgControl,
    private readonly _changeDetector: ChangeDetectorRef,
  ) {
    super(parentForm, parentFormGroup, ngControl, defaultErrorStateMatcher);

    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  public get empty(): boolean {
    return !this._phone;
  }

  public get phone(): string { return this._phone; }
  public set phone(phone: string) {
    this.stateChanges.next();
    this._changePhone(phone);
  }

  public get countryFormat(): IPhoneCountryFormat { return this._countryFormat; }
  public set countryFormat(countryFormat: IPhoneCountryFormat) {
    this.stateChanges.next();
    this._countryFormat = countryFormat;
    if (countryFormat === null) {
      this._phone = null;
    }
    this._changePhone(this.phone);
  }

  public ngOnInit(): void {
    this.stateChanges.next();
    this._getCollingCodes();
  }

  public ngAfterViewInit(): void {
    this.formControl = this.ngControl.control as FormControl;
    this.ngControl.control.setValidators(this.phoneValidator());
	}

  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(): void { }

  public writeValue(phone: string): void {
    this.value = phone;
    this.onChange(phone);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange(_: any): any { }
  public onTouched(): any { }

  public phoneValidator(): ValidatorFn {
    return (): {phonePattern: true} | null => {
      if (!this.phone || !this.countryFormat) {
        return { phonePattern: true };
      }
      
      const phone = `${this.countryFormat.callingCode} ${this.phone}`;
      const parsePhone = parsePhoneNumberFromString(phone, this.countryFormat.country);
      
      if (!parsePhone || !parsePhone.isValid()) {
        return { phonePattern: true };
      }
  
      return null;
    }
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _changePhone(phone: string): void {
    this.stateChanges.next();
    if (!phone || !this.countryFormat) {
      this.writeValue('');
      return;
    }

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
      countryFormats.push({ country, callingCode });
    });

    this.countryFormats = countryFormats;
  }

  private _controlValueAccessorChangeFn(value: string): void {
    if (this.countryFormat || !value) {
      return;
    }

    const phoneNumbers = findPhoneNumbersInText(value);
    const currentPhone = phoneNumbers[0];
    if (!currentPhone) {
      return;
    }

    this.countryFormat = this._getCountryFormatByName(currentPhone.number.country);
    this.phone = currentPhone.number.nationalNumber as string;
    this._changeDetector.detectChanges();
  }

  private _getCountryFormatByName(countryName: string | CountryCode): IPhoneCountryFormat {
    return this.countryFormats
      ? this.countryFormats.find((countryFormat) => countryFormat.country === countryName)
      : null;
  }

}

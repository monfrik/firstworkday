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
  AfterViewInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
  FormControl,
  ValidatorFn,
  FormGroup,
  AbstractControl,
  FormBuilder,
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
import { takeUntil } from 'rxjs/operators';

import {
  AsYouType,
  CountryCode,
  getCountries,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  findPhoneNumbersInText,
} from 'libphonenumber-js';

import { IPhoneCountryFormat, IPhoneGroup } from '../../interfaces';


export class PhoneInputComponentBase {

  constructor(
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {}

}

export class PhoneErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid);
  }

}

const PhoneInputComponentMixinBase: CanDisableCtor & CanUpdateErrorStateCtor =
  mixinDisabled(mixinErrorState(PhoneInputComponentBase));

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: PhoneInputComponent }],
})
export class PhoneInputComponent
  extends PhoneInputComponentMixinBase
  implements OnInit, OnDestroy, AfterViewInit,
  MatFormFieldControl<string>, ControlValueAccessor, CanDisable, CanUpdateErrorState {

  public static nextId = 0;

  @Input()
  public get value(): string { return this._value; }
  public set value(value: string) {
    this._value = value;
    this.stateChanges.next();
    this._controlValueAccessorChangeFn(value);
  }

  @Input()
  public get placeholder(): string { return this._placeholder; }
  public set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  @Input()
  public get required(): boolean { return this._required; }
  public set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  @HostBinding()
  public id = `app-phone-input-${PhoneInputComponent.nextId++}`;

  @HostBinding('attr.aria-describedby')
  public describedBy = '';

  public focused = false;
  public controlType = 'app-phone-input';

  public countryFormats: IPhoneCountryFormat[];
  public phoneForm: FormGroup;

  public readonly phoneMatcher = new PhoneErrorStateMatcher();
  public readonly stateChanges = new Subject<void>();

  private _value: string;
  private _placeholder: string;
  private _required = false;

  private readonly countries: CountryCode[] = getCountries();
  private readonly _destroy$ = new Subject<void>();

  public constructor(
    public readonly defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() public readonly parentForm: NgForm,
    @Optional() public readonly parentFormGroup: FormGroupDirective,
    @Optional() @Self() public readonly ngControl: NgControl,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _formBuilder: FormBuilder,
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
    return !this.phoneForm || !this.phone.value;
  }

  public get phone(): AbstractControl { return this.phoneForm.get('phone'); }
  public get countryFormat(): AbstractControl { return this.phoneForm.get('countryFormat'); }

  public ngOnInit(): void {
    this.stateChanges.next();
    this._getCollingCodes();
    this._initForm();
    this._subscribeForm();
  }

  public ngAfterViewInit(): void {
    this.ngControl.control.setValidators(this._phoneValidator());
	}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.stateChanges.complete();
  }

  public onContainerClick(): void { }
  public setDescribedByIds(): void { }

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

  public trackByFn(index: number): number {
    return index;
  }

  private _initForm(): void {
    this.phoneForm = this._formBuilder.group({
      countryFormat: [''],
      phone: ['', [this._phoneValidator()]],
    });
  }

  private _subscribeForm(): void {
    this.phoneForm.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((formGroup: IPhoneGroup): void => {
        this._changePhone(formGroup.phone);
      });
  }

  private _changePhone(phone: string): void {
    if (!phone || !this.countryFormat.value) {
      this.writeValue('');
      return;
    }

    const country = this.countryFormat.value.country;
    const asYouType = new AsYouType(country);
    const phoneAsType = asYouType.input(phone);
    this.phone.patchValue(phoneAsType, {
      emitEvent: false,
    });

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

  private _phoneValidator(): ValidatorFn {
    return (): {phonePattern: true} | null => {
      if (!this.phoneForm || !this.phone.value) {
        return null;
      }

      const phoneConrol = this.phone;
      const countryFormatConrol = this.countryFormat;
      if (!phoneConrol.value || !countryFormatConrol.value) {
        return { phonePattern: true };
      }

      const phone = `${countryFormatConrol.value.callingCode} ${phoneConrol.value}`;
      const parsePhone = parsePhoneNumberFromString(phone, countryFormatConrol.value.country);
      if (!parsePhone || !parsePhone.isValid()) {
        return { phonePattern: true };
      }

      return null;
    };
  }

  private _getCollingCodes(): void {
    const countryFormats: IPhoneCountryFormat[] = [];

    this.countries.forEach((country: CountryCode) => {
      const callingCode = `+${getCountryCallingCode(country)}`;
      countryFormats.push({ country, callingCode });
    });

    this.countryFormats = countryFormats;
  }

  private _controlValueAccessorChangeFn(phone: string): void {
    if (!this.phoneForm || this.countryFormat.value || !phone) {
      return;
    }

    const phoneNumbers = findPhoneNumbersInText(phone);
    const currentPhone = phoneNumbers[0];
    if (!currentPhone) {
      return;
    }

    this.phoneForm.patchValue({
      countryFormat: this._getCountryFormatByName(currentPhone.number.country),
      phone: currentPhone.number.nationalNumber as string,
    });

    this._changeDetector.detectChanges();
  }

  private _getCountryFormatByName(countryName: string | CountryCode): IPhoneCountryFormat {
    return this.countryFormats
      ? this.countryFormats.find(
        (countryFormat: IPhoneCountryFormat) => countryFormat.country === countryName,
      )
      : null;
  }

}

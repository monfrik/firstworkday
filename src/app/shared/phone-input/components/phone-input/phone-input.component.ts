import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { getCountries, AsYouType } from 'libphonenumber-js';
import { FormGroup, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
export class PhoneInputComponent implements OnInit, ControlValueAccessor  {

  public formGroup: FormGroup;
  public disableControl = true;
  public readonly countries = getCountries();

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formGroup = this._formBuilder.group({
      phone: [{value: '', disabled: true}],
      country: [''],
    })
    this.formGroup.get('phone').valueChanges
      .pipe()
      .subscribe((value) => {
        // console.log('formGroup ', this.formGroup.value.phone);
        // console.log('value ', value);
        if (value && this.formGroup.value.phone !== value) {
          const phoneControl = this.formGroup.get('phone');
          const country = this.formGroup.get('country').value;
          const newPhoneNumber = new AsYouType(country).input(value);
          this.writeValue(newPhoneNumber);
          this.onTouched();
          // phoneControl.setValue(newPhoneNumber);
          // console.log(newPhoneNumber);
        }
      });

    this.formGroup.get('country').valueChanges
      .subscribe((country) => {
        // console.log('country valueChanges = ', country);
        this.disableControl = false ;
      });
  }

  public writeValue(phone: string): void {
    this.onChange(phone);
  }

  public onChange(_): any { }
  public onTouched(): any { }
  public registerOnChange(fn): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

}

import {
  Component, 
  Input,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UserValidator } from '@app/core/validators/user-validator';
import { AddressValidator } from '@app/core/validators/address-validator';
import { StateValidator } from '@app/core/validators/state-validator';


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})

export class FormListComponent implements OnInit {

  public mask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  @Input()
  public formGroup: FormGroup;
  
  @Output()
  public updateList = new EventEmitter();

  @Output()
  public submit = new EventEmitter();

  public constructor(
    private readonly _formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this._formInitialization();
    this.onValueChanges();
  }

  public onValueChanges(): void {
    this.formGroup.valueChanges
      .subscribe( data => {
        this.updateList.emit(data);
      });
  }

  private _formInitialization(): void {
    this.formGroup.addControl('firstname', new FormControl('', [Validators.required, UserValidator.nameValidator]));
    this.formGroup.addControl('lastname', new FormControl('', [Validators.required, UserValidator.nameValidator]));
    this.formGroup.addControl('phone', new FormControl('', [Validators.required, UserValidator.phoneValidator]));
    this.formGroup.addControl('email', new FormControl('', [Validators.required, UserValidator.emailValidator]));
    this.formGroup.addControl('address', this._formBuilder.group({
      state: this._formBuilder.group({
        name: ['', [Validators.required, StateValidator.nameValidator]],
        shortname: ['', [Validators.required, StateValidator.shortnameValidator]],
      }),
      city: ['', [Validators.required, AddressValidator.cityValidator]],
      street: ['', [Validators.required, AddressValidator.streetValidator]],
      zipcode: ['', [Validators.required, AddressValidator.zipcodeValidator]],
    }))
    this.formGroup.addControl('avatar', new FormControl(null, [Validators.required, FileUploadValidators.filesLimit(1)]));
  }

}

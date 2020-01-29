import {
  Component, 
  AfterContentInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UserValidator } from '@app/core/validators/user-validator';
import { UserModel } from '../../models/user.model';


class FormListModel {
  public id: number;
  public firstname: string;
  public lastname: string;
  public phone: string;
  public email: string;
  public avatar: string;
  public state: string;
  public stateShort: string;
  public city: string;
  public street: string;
  public zipcode: string;

  public constructor(data: any = {}) {
    this.id = data.id || void 0;
    this.firstname = data.firstname || void 0;
    this.lastname = data.lastname || void 0;
    this.phone = data.phone || void 0;
    this.email = data.email || void 0;
    this.state = data.state || void 0;
    this.state = data.state || void 0;
    this.city = data.city || void 0;
    this.street = data.street || void 0;
    this.zipcode = data.zipcode || void 0;
  }
}

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})

export class FormListComponent implements AfterContentInit {

  @Input()
  public formGroup: FormGroup;
  
  @Output()
  public updateList = new EventEmitter();

  public constructor(private _formBuilder: FormBuilder) {}

  public ngAfterContentInit(): void {
    this.formGroup.addControl('firstname', new FormControl('', [Validators.required, UserValidator.nameValidator]))
    this.formGroup.addControl('lastname', new FormControl('', [Validators.required, UserValidator.nameValidator]))
    this.formGroup.addControl('phone', new FormControl('', [Validators.required, UserValidator.phoneValidator]))
    this.formGroup.addControl('email', new FormControl('', [Validators.required, UserValidator.emailValidator]))
    this.onValueChanges();
  }

  public clear(): void {}
  public reset(): void {}
  public save(): void {}

  public onValueChanges(): void {
    this.formGroup.valueChanges
      .subscribe( val => {
        this.updateList.emit(this._getUserModel(new FormListModel(val)));
      });
  }

  private _getUserModel(formData: FormListModel): UserModel {
    return new UserModel({
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      avatar: formData.avatar,
      address: {
        state: {
          name: formData.state,
          shortname: formData.stateShort,
        },
        city: formData.city,
        street: formData.street,
        zipcode: formData.zipcode,
      }
    })
  }

}

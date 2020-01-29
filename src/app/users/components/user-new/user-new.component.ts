import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UsersService } from '../../services/users';
import { UserModel } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { StateModel } from '../../models/state.model';
import { UserValidator } from '@core/validators/user-validator';
import { AddressValidator } from '@core/validators/address-validator';
import { StateValidator } from '@core/validators/state-validator';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  providers: [ UsersService ],
})

export class UserNewComponent implements OnInit {
  public formStepper;
  public formList;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.formStepper = this._formBuilder.group({
      firstFormGroup: this._formBuilder.group({}),
      secondFormGroup: this._formBuilder.group({}),
      thirdFormGroup: this._formBuilder.group({}),
    });
    this.formList = this._formBuilder.group({});
  }

  public submit(): void {
    const formData = this.formList.value;
    const user = new UserModel({
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
    // this._usersService
    //   .addUser(user)
    //   .subscribe()
  }

  public onUpdateStepper(data: any): void {
    this.formList.setValue(data);
  }
  public onUpdateList(data: any): void {
    console.log(data)
    // this.formList.setValue(data);
  }

}

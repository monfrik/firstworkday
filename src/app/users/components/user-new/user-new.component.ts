import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UsersService } from '../../services/users';
import { UserModel } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { StateModel } from '../../models/state.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  providers: [ UsersService ],
})
export class UserNewComponent implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group( {
      state: ['', [Validators.required]],
      stateShort: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
    });
    this.thirdFormGroup = this._formBuilder.group( {
      avatar: [[], [Validators.required, FileUploadValidators.filesLimit(1)]],
    });
  }

  public submit(): void {
    const stateData = {
      shortname: this.secondFormGroup.value.stateShort,
      name: this.secondFormGroup.value.state,
    }
    const state = new StateModel(stateData);
    const { city, street, zipcode } = this.secondFormGroup.value;
    const address = new AddressModel({
      state,
      city,
      street,
      zipcode
    });
    const { firstname, lastname, phone, email } = this.firstFormGroup.value;
    const { avatar } = this.thirdFormGroup.value;
    const user = new UserModel({
      firstname,
      lastname,
      phone,
      email,
      address,
      avatar: avatar[0].name
    })
    this._usersService
      .addUser(user)
      .subscribe()
  }

}

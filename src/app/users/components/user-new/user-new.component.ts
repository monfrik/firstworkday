import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
  public formStepper;
  public formList;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.formStepper = this._formBuilder.group({});
    this.formList = this._formBuilder.group({});
  }

  public onSubmit(): void {
    if (this.formList.valid) {
      const newUser = new UserModel(this.formList.value);
      this._usersService
        .addUser(newUser)
        .subscribe(data => console.log(data));
    }
  }
  
  public onUpdateStepper(data: any = {}): void {
    this.formList.patchValue({
      firstname: data.firstFormGroup.firstname,
      lastname: data.firstFormGroup.lastname,
      phone: data.firstFormGroup.phone,
      email: data.firstFormGroup.email,
      address: {
        state: {
          name: data.secondFormGroup.state,
          shortname: data.secondFormGroup.stateShort,
        },
        city: data.secondFormGroup.city,
        street: data.secondFormGroup.street,
        zipcode: data.secondFormGroup.zipcode,
      },
      avatar: data.thirdFormGroup.avatar,
    }, {
      emitEvent: false
    })
  }

  public onUpdateList(data: any = {}): void {
    this.formStepper.get('firstFormGroup').patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
    }, {
      emitEvent: false
    })
    this.formStepper.get('secondFormGroup').patchValue({
      state: data.address.state.name,
      stateShort: data.address.state.shortname,
      city: data.address.city,
      street: data.address.street,
      zipcode: data.address.zipcode,
    }, {
      emitEvent: false
    })
    this.formStepper.get('thirdFormGroup').patchValue({
      avatar: data.avatar,
    }, {
      emitEvent: false
    })
  }

}

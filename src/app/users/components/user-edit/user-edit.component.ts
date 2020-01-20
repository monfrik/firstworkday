import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})

export class UserEditComponent implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group( {
      state: ['', Validators.required],
      stateShort: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group( {
      avatar: ['', Validators.required],
    });
  }
}
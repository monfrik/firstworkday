import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})

export class UserEditComponent implements OnInit {
  public userForm: FormGroup;

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: this._formBuilder.group({
        state: this._formBuilder.group({
          name: ['', [Validators.required]],
          shortname: ['', [Validators.required]],
        }),
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
      }),
      avatar: [[], [Validators.required, FileUploadValidators.filesLimit(1)]],
    });
  }

  public clear(): void {}
  public reset(): void {}
  public save(): void {}
}
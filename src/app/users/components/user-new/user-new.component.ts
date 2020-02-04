import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../../services';
import { UserModel } from '../../models/user.model';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  providers: [ UsersService ]
})

export class UserNewComponent implements OnDestroy {

  public formStepper;
  public formList;

  private _destroyed$ = new Subject();

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _usersService: UsersService,
  ) {}

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onSubmit(): void {
    if (this.formList.valid) {
      const newUser = new UserModel(this.formList.getRawValue());
      this._usersService
        .addUser(newUser)
        .pipe(
          takeUntil(this._destroyed$)
        )
        .subscribe(() => {
          this._openSnackBar('New user added', 'Ok');
          this._router.navigate(['/users']);
        });
    }
  }

  private _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  // public onUpdateStepper(data: any = {}): void {
  //   this.formList.patchValue({
  //     firstname: data.firstFormGroup.firstname,
  //     lastname: data.firstFormGroup.lastname,
  //     phone: data.firstFormGroup.phone,
  //     email: data.firstFormGroup.email,
  //     address: {
  //       state: {
  //         name: data.secondFormGroup.state,
  //         shortname: data.secondFormGroup.stateShort,
  //       },
  //       city: data.secondFormGroup.city,
  //       street: data.secondFormGroup.street,
  //       zipcode: data.secondFormGroup.zipcode,
  //     },
  //     avatar: data.thirdFormGroup.avatar,
  //   }, {
  //     emitEvent: false,
  //   });
  // }

  // public onUpdateList(data: any = {}): void {
  //   this.formStepper.get('firstFormGroup').patchValue({
  //     firstname: data.firstname,
  //     lastname: data.lastname,
  //     phone: data.phone,
  //     email: data.email,
  //   }, {
  //     emitEvent: false
  //   });

  //   this.formStepper.get('secondFormGroup').patchValue({
  //     state: data.address.state.name,
  //     stateShort: data.address.state.shortname,
  //     city: data.address.city,
  //     street: data.address.street,
  //     zipcode: data.address.zipcode,
  //   }, {
  //     emitEvent: false
  //   });

  //   this.formStepper.get('thirdFormGroup').patchValue({
  //     avatar: data.avatar,
  //   }, {
  //     emitEvent: false
  //   });
  // }

}

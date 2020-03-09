import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '@app/users/services';
import { UserModel } from '@app/users/models';
import { IFormsGroupValue } from '@app/users/interfaces';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserCreateComponent implements OnInit, OnDestroy {

  public userToCreate: UserModel;

  private _submited = false;

  private readonly _destroy$ = new Subject<void>();

  public constructor(
    private readonly _router: Router,
    private readonly _usersService: UsersService,
    private readonly _snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this._getUserToCreate();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (!this._submited) {
      if (!confirm('Save data?')) {
        this._usersService.clearCreateUser();
      } else {
        this._usersService.patchCreateUser(this.userToCreate);
      }
    }
  }

  public onSubmit(userToCreate: IFormsGroupValue): void {
    this._submited = true;
    const user = this._convertToModel(userToCreate);
    this._usersService
      .updateUser(user)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/users']);
          this._openSnackBar('User saved', 'Ok');
        },
        error: () => {},
        complete: () => {},
      });
  }

  public onChangeUser(userToCreate: IFormsGroupValue): void {
    const user = this._convertToModel(userToCreate);
    this._pacthUser(user);
  }

  private _getUserToCreate(): void {
    this._usersService.createUser$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (userToCreate: UserModel) => {
          this.userToCreate = userToCreate || null;
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _convertToModel (formData: IFormsGroupValue): UserModel {
    return new UserModel({
      ...formData.personalInfoForm,
      ...formData.additionalInfoForm,
      address: {
        ...formData.addressInfoForm,
        state: {
          name: formData.addressInfoForm.state,
          shortname: formData.addressInfoForm.stateshort,
        },
      }
    });
  }

  private _pacthUser(userToCreate: UserModel): void {
    this.userToCreate = userToCreate;
  }

  private _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}

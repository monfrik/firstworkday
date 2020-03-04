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

  public onSubmit(userToCreate: UserModel): void {
    this._submited = true;
    this._usersService
      .updateUser(userToCreate)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/users']);
          this._openSnackBar('User changed', 'Ok');
        },
        error: () => {},
        complete: () => {},
      });
  }

  public onChangeUser(userToCreate: UserModel): void {
    this._pacthUser(userToCreate);
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

  private _pacthUser(userToCreate: UserModel): void {
    this.userToCreate = userToCreate;
  }

  private _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}

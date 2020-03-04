import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '@app/users/services';
import { UserModel } from '@app/users/models';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserEditComponent implements OnInit, OnDestroy {

  public editedUser: UserModel;

  private _destroy$ = new Subject<void>();
  private _submited = false;

  public constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usersService: UsersService,
    private readonly _snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this._getUser(+this._activatedRoute.snapshot.params.id);
  }

  public onSubmit(editedUser: UserModel): void {
    this._submited = true;
    this._usersService
      .updateUser(editedUser)
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

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (!this._submited) {
      if (!confirm('Save data?')) {
        this._usersService.clearEditedUser();
      } else {
        this._usersService.patchEditedUser(this.editedUser);
      }
    }
  }

  public onChangeUser(user: UserModel): void {
    this._pacthUser(user);
  }

  private _pacthUser(editedUser: UserModel): void {
    this.editedUser = editedUser;
  }

  private _getUser(id: number): void {
    this._usersService.editedUser$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (editedUser: UserModel) => {
          if (!editedUser || editedUser.id !== id) {
            this._fetchUser(id);
          } else {
            this.editedUser = editedUser;
          }
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _fetchUser(id: number): void {
    this._usersService
      .getUser(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (user: UserModel) => {
          this.editedUser = user;
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}

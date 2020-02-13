import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { UsersService } from '../../services';
import { UserModel } from '../../models/user.model';


@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  // providers: [ UsersService ]
})

export class UserEditComponent implements OnInit, OnDestroy{
  public formStepper;
  public formList;
  public initialData: UserModel;

  private _destroyed$ = new Subject<void>();

  public constructor(
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    // private readonly _usersService: UsersService,
    private readonly _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._route.params
      .subscribe(params => {
        this._getUserData(params['id']);
      })
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onSubmit(): void {
    if (this.formList.valid) {
      const newUser = new UserModel(this.formList.getRawValue());
      // this._usersService
      //   .addUser(newUser)
      //   .pipe(
      //     takeUntil(this._destroyed$)
      //   )
      //   .subscribe(() => {
      //     this._openSnackBar('New user added', 'Ok');
      //     this._router.navigate(['/users']);
      //   });
    }
  }

  private _getUserData(id: string): void {
    // this._usersService
    //   .getUser(id)
    //   .subscribe(data => {
    //     this._usersService.patchUserForm(new UserModel(data), 'service');
    //     // this.initialData = new UserModel(data);
    //   })
  }

  private _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
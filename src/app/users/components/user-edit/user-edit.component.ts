import { Component, OnDestroy, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { UsersService } from '@app/users/services';

import { UserModel } from '@app/users/models';
import { TabDirective } from '@app/users/directives';


@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UsersService]
})

export class UserEditComponent implements OnInit, OnDestroy{

  @ViewChildren(TabDirective) tabs: QueryList<TabDirective>;

  public formStepper;
  public formList;
  public initialData: UserModel;

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
  
  public onSubmit(user: UserModel): void {
    this._destroy();
    const newUser = this._getUserWithId(user);
    this._submited = true;
    this._usersService
      .updateUser(newUser)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          // console.log('onSubmit updateUser');
        },
        error: () => {},
        complete: () => {},
      });
    this._router.navigate(['/users']);
    this._openSnackBar('User changed', 'Ok');
  }

  public onPacthFormList(user: UserModel): void {
    this._pacthUser(user);
  }

  public onPacthFormStepper(user: UserModel): void {
    this._pacthUser(user);
  }
  
  public onChangeTab() {
    const activeTab = this.tabs.find(tab => tab.isActive);
    this._usersService.changeTabEvent.emit(activeTab.tab);
  }

  public ngOnDestroy(): void {
    this._destroy();

    if (!this._submited) {
      if (!confirm('Save data?')) {
        this._usersService.clearEditedUser();
      }
    }
  }
  
  private _pacthUser(editedUser: UserModel): void {
    const data = this._getUserWithId(editedUser);
    this._usersService.patchEditedUser(data)
  }

  private _getUser(id: number): void {
    this._usersService
      .getUser(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (user: UserModel) => {
          // console.log('_getUser user', user);
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _getUserWithId(user: UserModel): UserModel {
    const id = +this._activatedRoute.snapshot.params.id;
    return {...user, ...{id}};
  }

  private _openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
  
  private _destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  
}

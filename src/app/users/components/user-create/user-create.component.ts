import { Component, OnDestroy, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '@app/users/services';

import { UserModel } from '@app/users/models';
import { TabDirective } from '@app/users/directives';


@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})

export class UserCreateComponent implements OnInit, OnDestroy{

  @ViewChildren(TabDirective) tabs: QueryList<TabDirective>;

  public formStepper;
  public formList;
  public initialData: UserModel;

  private _destroy$ = new Subject<void>();
  private _submited = false;

  public constructor(
    private readonly _router: Router,
    private readonly _usersService: UsersService,
    private readonly _snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
  }
  
  public onSubmit(user: UserModel): void {
    this._destroy();
    this._submited = true;
    this._usersService
      .addUser(user)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/users']);
          this._openSnackBar('User create', 'Ok');
        },
        error: () => {},
        complete: () => {},
      });
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
        this._usersService.clearCreateUser();
      }
    }
  }
  
  private _pacthUser(user: UserModel): void {
    this._usersService.patchCreateUser(user);
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

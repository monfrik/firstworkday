import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { UserApiService } from '@core/services';
import { UserModel } from '../../models';


@Injectable()

export class UsersService {

  public users;
  public userFormData$ = new Subject();

  public constructor(
    private readonly _userApiService: UserApiService,
  ) {}

  public getUsers(): Observable<UserModel[]> {
    return this._userApiService
      .getUsers();
  }

  public addUser(data: UserModel): Observable<UserModel> {
    return this._userApiService
      .addUser(data);
  }

  public patchUserForm(userData: UserModel) {
    this.userFormData$.next(new UserModel(userData));
  }

}

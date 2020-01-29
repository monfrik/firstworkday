import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserApiService } from '@core/services/user-api';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UsersService {
  public users;

  constructor(
    private readonly _userApiService: UserApiService,
  ) {}

  public getUsers(): Observable<UserModel[]> {
    return this._userApiService
      .getUsers()
  }

  public addUser(data: UserModel): Observable<UserModel> {
    return this._userApiService
      .addUser(data as UserModel)
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { UserApiService } from '@core/user-api.service.ts';

const USERS_URL = 'api/users';

@Injectable()
export class UserTableService {
  public users;

  constructor(
    private readonly _userApiService: UserApiService,
  ) {}

  public getUsers(): Observable<UserModel[]> {
    return this._userApiService
      .getUsers()
  }
}

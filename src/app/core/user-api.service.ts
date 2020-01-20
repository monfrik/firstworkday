import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserModel } from "../users/models/user.model";


const USERS_URL = 'api/users';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private readonly _http: HttpClient
  ) {}

  public getUsers(): Observable<UserModel[]> {
    return this._http
      .get<UserModel[]>(USERS_URL)
      .pipe(
        map((data: any) => {
          if (!data) {
            return [];
          }
          return data.map(item => new UserModel(item));
        })
      );
  }

}

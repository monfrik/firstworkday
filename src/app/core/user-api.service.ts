import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UserModel } from "../users/models/user.model";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
          console.log('service', data);
          if (!data) {
            console.log('1')
            return [];
          }
          console.log('2')
          console.log(data[0])
          const asd = new UserModel(data[0]);
          console.log(asd)
          console.log(data.map(item => new UserModel(item)))
          return data.map(item => new UserModel(item));
        })
      );
  }

  public addUser(data: UserModel): Observable<UserModel> {
    return this._http
      .post<UserModel>(USERS_URL, data, HTTP_OPTIONS)
      .pipe(
        tap((data)=> {console.log(data)})
      )
  }

}

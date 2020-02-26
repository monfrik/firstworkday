import { Injectable, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { UserApiService } from '@core/services';
import { UserModel } from '../../models';
import { map } from 'rxjs/operators';
import { convertDate } from '@app/utils';


@Injectable()

export class UsersService {

  public users;
  public editedUser$ = new Subject<UserModel>();
  public changeTabEvent = new EventEmitter<string>();
  
  public constructor(
    private readonly _userApiService: UserApiService,
  ) {}

  public getUsers(): Observable<UserModel[]> {
    return this._userApiService
      .getUsers();
  }

  public getUsersWithParams(filter: any): Observable<UserModel[]> {
    // console.log('getUsersWithParams params', params);
    return this._userApiService
      .getUsers()
      .pipe(
        map((users: UserModel[]) => {
          return users.filter((element: UserModel) => {
            let condition = true;
            if (filter.usersId && filter.usersId.length) {
              condition = condition && filter.usersId.includes(element.id);
            }
        
            if (filter.phone) {
              const userPhone = element.phone.replace(/[^\d]/, '');
              condition = condition && userPhone.includes(filter.phone);
            }
        
            if (filter.state) {
              condition = condition && filter.state === element.address.state.shortname;
            }
        
            if (filter.dateStart || filter.dateEnd) {
              debugger;
              const birthday = element.birthday.toISOString().slice(0,10);
        
              if (filter.dateStart) {
                condition = condition && convertDate(filter.dateStart) <= birthday;
              }
        
              if (filter.dateEnd) {
                condition = condition && convertDate(filter.dateEnd) >= birthday;
              }
            }
        
            return condition;
          })
        }),
      );
  }

  public getUser(id: number): Observable<UserModel> {
    return this._userApiService
      .getUser(id);
  }

  public addUser(newUser: UserModel): Observable<UserModel> {
    return this._userApiService
      .addUser(newUser);
  }

  public updateUser(updatedUser: UserModel): Observable<UserModel> {
    // console.log('updateUser updatedUser', updatedUser);
    return this._userApiService
      .addUser(updatedUser);
  }

  public clearEditedUser(): void {
    // console.log('clearEditedUser');
    this.editedUser$.next(null);
  }

  public patchEditedUser(userData: UserModel): void {
    // console.log('patchEditedUser userData', userData)
    this.editedUser$.next(userData);
  }

}

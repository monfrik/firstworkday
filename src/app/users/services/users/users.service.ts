import { Injectable, EventEmitter } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { UserApiService } from '@core/services';
import { UserModel } from '../../models';
import { map } from 'rxjs/operators';
import { convertDate } from '@app/utils';


@Injectable()

export class UsersService {

  public users;
  public editedUser$ = new BehaviorSubject<UserModel>(null);
  public createUser$ = new BehaviorSubject<UserModel>(null);
  public changeTabEvent = new EventEmitter<string>();
  
  public constructor(
    private readonly _userApiService: UserApiService,
  ) {}

  public getUsers(): Observable<UserModel[]> {
    return this._userApiService
      .getUsers();
  }

  public getUsersWithParams(filter: any): Observable<UserModel[]> {
    return this._userApiService
      .getUsers()
      .pipe(
        map((users: UserModel[]) => {
          return this._filterUsers(users, filter);
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
    return this._userApiService
      .addUser(updatedUser);
  }

  public clearEditedUser(): void {
    this.editedUser$.next(null);
  }

  public clearCreateUser(): void {
    this.editedUser$.next(null);
  }

  public patchEditedUser(userData: UserModel): void {
    this.editedUser$.next(userData);
  }

  public patchCreateUser(userData: UserModel): void {
    this.createUser$.next(userData);
  }

  private _filterUsers(users: UserModel[], filter: any): UserModel[] {
    return users.filter((element: UserModel): boolean => {
      if (filter.usersId && filter.usersId.length) {
        if (!filter.usersId.includes(element.id)) {
          return false;
        }
      }
  
      if (filter.phone) {
        const userPhone = element.phone.replace(/[^\d]/, '');
        if (!userPhone.includes(filter.phone)) {
          return false;
        }
      }
  
      if (filter.state) {
        if (filter.state !== element.address.state.shortname) {
          return false;
        }
      }
      
      if (filter.dateStart || filter.dateEnd) {
        const birthday = convertDate(element.birthday);
  
        if (filter.dateStart) {
          if (convertDate(filter.dateStart) > birthday) {
            return false;
          }
        }
        
        if (filter.dateEnd) {
          if (convertDate(filter.dateEnd) < birthday) {
            return false;
          }
        }
      }
      return true;
    })
  }

}

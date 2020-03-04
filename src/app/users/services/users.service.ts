import { Injectable, EventEmitter } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserApiService } from '@core/services';
import { convertDate } from '@utils';

import { UserModel } from '../models';


@Injectable()

export class UsersService {

  public users;
  public changeTabEvent = new EventEmitter<string>();

  private _editedUser$ = new BehaviorSubject<UserModel>(null);
  private _createUser$ = new BehaviorSubject<UserModel>(null);

  public constructor(
    private readonly _userApiService: UserApiService,
  ) {}

  get editedUser$(): Observable<UserModel> {
    return this._editedUser$.asObservable();
  }

  get createUser$(): Observable<UserModel> {
    return this._createUser$.asObservable();
  }

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
    this._editedUser$.next(null);
  }

  public clearCreateUser(): void {
    this._editedUser$.next(null);
  }

  public patchEditedUser(userData: UserModel): void {
    this._editedUser$.next(userData);
  }

  public patchCreateUser(userData: UserModel): void {
    this._createUser$.next(userData);
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
    });
  }

}

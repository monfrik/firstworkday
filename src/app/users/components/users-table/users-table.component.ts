import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { convertDate } from '@utils';

import { IRouterParams } from '@app/core/interfaces';
import { UsersService } from '@app/users/services';
import { UserModel } from '@app/users/models';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})

export class UsersTableComponent implements OnInit, OnDestroy {

  public allUsers: UserModel[] = null;
  public filtredTable: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'position',
    'firstname',
    'lastname',
    'phone',
    'email',
    'birthday',
    'addressStateName',
    'addressCity',
    'addressStreet',
    'addressZipcode',
    'avatar',
    'actions',
  ];

  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  private _destroy$ = new Subject<void>();
  private _filter$ = new Subject<IRouterParams>();

  public constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this._subscribeFilter();
    this._getAllUsers();
    this._initFiltres();
    this._subscribeRoute();
  }

  public onApllyFilter(filtres: IRouterParams): void {
    this._filter$.next(filtres);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _subscribeFilter(): void {
    this._filter$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (filtres: IRouterParams) => {
          const queryParams = this._getIRouterParams(filtres);
          this._router.navigate(['/users'], { queryParams });
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _subscribeRoute(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this._destroy$),
        map((queryParams: any) => {
          const newQueryParams = { ...queryParams };
          if (newQueryParams.usersId && typeof newQueryParams.usersId === 'string') {
            newQueryParams.usersId = [+newQueryParams.usersId];
          }
          if (newQueryParams.usersId && newQueryParams.usersId.length) {
            newQueryParams.usersId = newQueryParams.usersId.map((userId) => +userId);
          }
          return newQueryParams;
        }),
      )
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (queryParams: IRouterParams): void => {
          this._getUsersWithQueryParams(queryParams);
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _getUsersWithQueryParams(queryParams: IRouterParams): void {
    this._usersService
      .getUsersWithParams(queryParams)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (usersWithParams: UserModel[]) => {
          this.filtredTable = new MatTableDataSource(usersWithParams);
          this.filtredTable.sort = this.sort;
          this.filtredTable.paginator = this.paginator;
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _getAllUsers(): void {
    this._usersService
      .getUsers()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (allUsers: UserModel[]) => {
          this.allUsers = allUsers;
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _getIRouterParams(filtres: IRouterParams): IRouterParams {
    const routerParams: IRouterParams = {};

    if (filtres.usersId && filtres.usersId.length) {
      routerParams.usersId = filtres.usersId;
    }
    if (filtres.phone) {
      routerParams.phone = filtres.phone;
    }
    if (filtres.state) {
      routerParams.state = filtres.state;
    }
    if (filtres.dateStart) {
      routerParams.dateStart = convertDate(filtres.dateStart);
    }
    if (filtres.dateEnd) {
      routerParams.dateEnd = convertDate(filtres.dateEnd);
    }

    return routerParams;
  }

  private _initFiltres(): void {
    const usersId = this._activatedRoute.snapshot.queryParams.usersId || [];
    const phone = this._activatedRoute.snapshot.queryParams.phone || '';
    const state = this._activatedRoute.snapshot.queryParams.state || '';
    const dateStart = this._activatedRoute.snapshot.queryParams.dateStart || '';
    const dateEnd = this._activatedRoute.snapshot.queryParams.dateEnd || '';

    this._filter$.next({
      usersId,
      phone,
      state,
      dateStart,
      dateEnd,
    });
  }

}

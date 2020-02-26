import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { UsersService } from '../../services';
import { UserModel } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterParams } from '@app/core/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { convertDate } from '@app/utils';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [ UsersService ],
})

export class UsersTableComponent implements OnInit, OnDestroy {
  
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

  @ViewChild(MatPaginator, {static: true})
  public paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  public sort: MatSort;

  private _destroy$ = new Subject<void>();
  private _filter$ = new Subject<RouterParams>();

  public constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this._subscribeFilter();
    this._getUsers();
    this._subscribeRoute();
    this._initFiltres();
    // this._usersService
    // .getUsers()
    // .subscribe({
    //   next: (data: UserModel[]) => {
    //       this.users = new MatTableDataSource(data);
    //       this.users.sort = this.sort;
    //       this.users.paginator = this.paginator;
    //     },
    //     error: () => {},
    //     complete: () => {},
    //   });
  }

  public onApllyFilter(filtres: RouterParams): void {
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
        next: (filtres: RouterParams) => {
          const queryParams = this._getRouterParams(filtres);
          this._router.navigate(['/users'], { queryParams });
        }
      })
  }

  private _subscribeRoute(): void {
    this._activatedRoute.queryParams.subscribe((queryParams: any): void => {
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
    });
  }

  private _getUsers(): void {
    // console.log('_getUsers');
    // this.
    // this._store
    //   .pipe(
    //     takeUntil(this._destroyed$),
    //     select(selectUserList),
    //     tap((data: UserModel[]) => {
    //       if (data === null) {
    //         this._initFiltres();
    //       }
    //     }),
    //     filter((data: UserModel[]) => !!data),
    //     takeUntil(this._destroyed$),
    //   )
    //   .subscribe({
    //     next: (data: UserModel[]) => {
    //       this.filtredTable = new MatTableDataSource(data);
    //       this.filtredTable.sort = this.sort;
    //       this.filtredTable.paginator = this.paginator;
    //     },
    //     error: () => {},
    //     complete: () => {},
    //   })
  }

  private _getRouterParams(filtres: RouterParams): RouterParams {
    let routerParams: RouterParams = {};

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

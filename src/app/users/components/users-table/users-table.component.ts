import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { UsersService } from '../../services';
import { UserModel } from '../../models/user.model';
import { convertDate } from '@app/utils';


interface RouterParams {
  usersId?: number[] | string[];
  phone?: string;
  state?: string;
  dateStart?: string;
  dateEnd?: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [ UsersService ],
})

export class UsersTableComponent implements OnInit {
  
  public users: MatTableDataSource<any>;
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

  public constructor(
    private readonly _usersService: UsersService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._usersService
    .getUsers()
    .subscribe({
      next: (data: UserModel[]) => {
          this.users = new MatTableDataSource(data);
          this.users.sort = this.sort;
          this.users.paginator = this.paginator;
          this.users.filterPredicate = this._filterTable;
          this._initFiltres();
        },
        error: () => {},
        complete: () => {},
      });
  }

  public sortUsers(sortEvent): void {
    console.log(sortEvent);
  }

  public onApllyFilter(filtres: RouterParams): void {
    this.users.filter = filtres;
    const queryParams = this._getRouterParams(filtres);
    this._router.navigate(['/users'], { queryParams });
  }

  private _filterTable(data: UserModel, filter): boolean {
    let condition = true;
    if (filter.usersId.length) {
      condition = condition && filter.usersId.includes(data.id);
    }

    if (filter.phone) {
      const userPhone = data.phone.replace(/[^\d]/, '');
      condition = condition && userPhone.includes(filter.phone);
    }

    if (filter.state) {
      condition = condition && filter.state === data.address.state.shortname;
    }

    if (filter.dateStart || filter.dateEnd) {
      const birthday = data.birthday.slice(0,10);

      if (filter.dateStart) {
        condition = condition && convertDate(filter.dateStart) <= birthday;
      }

      if (filter.dateEnd) {
        condition = condition && convertDate(filter.dateEnd) >= birthday;
      }
    }

    return condition;
  }

  private _getRouterParams(filtres: RouterParams): RouterParams {
    let routerParams: RouterParams = {};

    if (filtres.usersId.length) routerParams.usersId = filtres.usersId;
    if (filtres.phone) routerParams.phone = filtres.phone;
    if (filtres.state) routerParams.state = filtres.state;
    if (filtres.dateStart) routerParams.dateStart = convertDate(filtres.dateStart);
    if (filtres.dateEnd) routerParams.dateEnd = convertDate(filtres.dateEnd);

    return routerParams;
  }

  private _initFiltres(): void {
    const usersId = this._route.snapshot.queryParams.usersId || [];
    const phone = this._route.snapshot.queryParams.phone || '';
    const state = this._route.snapshot.queryParams.state || '';
    const dateStart = this._route.snapshot.queryParams.dateStart || '';
    const dateEnd = this._route.snapshot.queryParams.dateEnd || '';
    this.users.filter = {
      usersId,
      phone,
      state,
      dateStart,
      dateEnd,
    };
  
  }

}

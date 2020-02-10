import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { UsersService } from '../../services';
import { UserModel } from '../../models/user.model';


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
  ) {}

  public ngOnInit(): void {
    this._usersService
    .getUsers()
    .subscribe({
      next: (data: UserModel[]) => {
          this.users = new MatTableDataSource(data);
          this.users.sort = this.sort;
          this.users.paginator = this.paginator;
        },
        error: () => {},
        complete: () => {},
      });
  }

  public sortUsers(sortEvent): void {
    console.log(sortEvent);
  }

  public onApllyFilter(filtres): void {
    console.log('onApllyFilter', filtres);
  }

}

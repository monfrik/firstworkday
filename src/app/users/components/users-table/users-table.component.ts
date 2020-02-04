import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsersService } from '../../services';
import { UserModel } from '../../models/user.model';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [ UsersService ],
})

export class UsersTableComponent implements OnInit {

  public users = new MatTableDataSource<UserModel>([]);
  public displayedColumns: string[] = [
    'position',
    'firstname',
    'lastname',
    'phone',
    'email',
    'addressStateName',
    'addressCity',
    'addressStreet',
    'addressZipcode',
    'avatar',
    'actions',
  ];

  @ViewChild(MatPaginator, {static: true})
  public paginator: MatPaginator;

  public constructor(
    private readonly _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this._usersService
      .getUsers()
      .subscribe({
        next: (data) => {
          this.users = new MatTableDataSource<UserModel>(data);
          this.users.paginator = this.paginator;
        },
        error: () => {},
        complete: () => {},
      });
  }

  public applyFilter(filterValue: string): void {
    this.users.filter = filterValue.trim().toLowerCase();
  }

}

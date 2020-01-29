import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Subscriber } from 'rxjs';

import { UsersService } from "../../services/users";
import { UserModel } from "../../models/user.model";


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [ UsersService ],
})
export class UsersTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
 
  constructor(
    private readonly _usersService: UsersService,
  ) { }
  
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
      })
  }

  public applyFilter(filterValue: string): void {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  public editItem(id: number): void {

  }

}

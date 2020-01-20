import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Subscriber } from 'rxjs';

import { UserTableService } from "../../services/user-table";
import { UserModel } from "../../models/user.model";


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [ UserTableService ],
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
    'adressStateName',
    'adressCity',
    'adressStreet',
    'adressZipcode',
    'avatar'
  ];
 
  constructor(
    private readonly _userTableService: UserTableService,
  ) { }
  
  public ngOnInit(): void {
    this._userTableService
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

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

}

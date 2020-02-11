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
          this.users.filterPredicate = this._filterTable
        },
        error: () => {},
        complete: () => {},
      });
  }

  public sortUsers(sortEvent): void {
    console.log(sortEvent);
  }

  public onApllyFilter(filtres): void {
    this.users.filter = filtres;
    console.log('onApllyFilter', filtres);
  }

  private _filterTable(data, filter): boolean {
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
    // if (filter.dateStart) {
      // const date = new Date();
      // const year = filter.dateStart.getFullYear();
      // const month = filter.dateStart.getMonth();
      // const day = filter.dateStart.getDay();
      // const newDate = new Date(year, month, day, 0, -date.getTimezoneOffset());
      // console.log('filter ======   ', filter.dateStart)
      // console.log('new Date ======   ', new Date(year, month, day))
      // console.log('time zone ======   ',newDate)
      // console.log('year = ', year);
      // console.log('month = ', month);
      // console.log('day = ', day);
      // const millDate = filter.dateStart.parse() - new Date().getTimezoneOffset();
      // const millDate = filter.dateStart.UTC();
      const こんにちは = Date.parse(filter.dateStart) - new Date().getTimezoneOffset()*60000;
      // const どうやって = Date.parse(filter.dateStart.toString());
      // const は = Date.parse(filter.dateStart.toISOString());
      // const 君は = Date.parse(filter.dateStart.toString()) - new Date().getTimezoneOffset()*60000;
      const マクシム = new Date(こんにちは).toISOString();
      console.log('timeZONA = ', new Date().getTimezoneOffset());
      console.log('classic = ', マクシム);
      console.log("̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿", マクシム.slice(0,10));
      // console.log('toString -  ', new Date(どうやって).toISOString());
      // console.log('toISOString -  ', new Date(は).toISOString());
      // console.log('toISOString -  ', new Date(君は).toISOString());
      // console.log('millDate = ', millDate);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      // console.log(newDate.toISOString())
      // console.log(typeof(data.birthday))
      // console.log(data.birthday.slice(0, 10));
      // console.log(filter.dateStart.toISOString());
      // console.log(filter.dateStart.toISOString().slice(0,10));
      // console.log(filter.dateStart.getFullYear()+'-'+filter.dateStart.getMonth()+'-'+filter.dateStart.getDay())
      // console.log(new Date(data.birthday))
      // console.log(filter.dateStart)
      // console.log(data.birthday)
      // console.log(data.birthday)
      // console.log(new Date(data.birthday));
      // console.log(new Date(Date.UTC(data.birthday)));
      // condition = condition && filter.dateStart <= data.birthday;
    // }
    if (filter.dateEnd) {
      // condition = condition && filter.dateEnd >= data.birthday;
    }
    return condition
  }

}

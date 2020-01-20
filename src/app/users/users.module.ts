import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersTableComponent } from './components/users-table';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [
    UsersTableComponent,
  ],
})
export class UsersModule { }

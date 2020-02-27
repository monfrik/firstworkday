import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  UsersTableComponent,
  UserEditComponent,
  UserCreateComponent
} from './components';


const routes: Routes = [
  {
    path: '',
    component: UsersTableComponent,
  },
  {
    path: 'create',
    component: UserCreateComponent,
  },
  {
    path: ':id',
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UsersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersTableComponent } from './components/users-table';
import { UserEditComponent } from './components/user-edit';
import { UserNewComponent } from './components/user-new';


const routes: Routes = [
  {
    path: '',
    component: UsersTableComponent
  },
  {
    path: 'new',
    component: UserNewComponent
  },
  {
    path: ':id',
    component: UserEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
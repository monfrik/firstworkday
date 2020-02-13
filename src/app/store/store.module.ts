import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import * as fromUsers from './reducers/users.reducer';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ users: fromUsers.reducer }),
  ],
  exports: [
  ]
})
export class AppStoreModule { }

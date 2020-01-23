import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FileUploadModule } from '@iplab/ngx-file-upload';

import { SharedModule } from '../shared/shared.module';
import { UsersTableComponent } from './components/users-table';
import { UsersRoutingModule } from './users-routing.module';
import { UserEditComponent } from './components/user-edit';
import { UserNewComponent } from './components/user-new';
import { FormStepperComponent } from './components/form-stepper';


@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    FileUploadModule,
  ],
  declarations: [
    UsersTableComponent,
    UserEditComponent,
    UserNewComponent,
    FormStepperComponent,
  ],
})
export class UsersModule { }

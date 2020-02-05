import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';

import { FileUploadModule } from '@iplab/ngx-file-upload';

import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import {
  UsersTableComponent,
  UserEditComponent,
  UserNewComponent,
  FormListComponent,
  FormStepperComponent,
  FirstStepComponent,
  SecondStepComponent,
  ThirdStepComponent,
} from './components';

import { ErrorFiledComponent } from '../core/components';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    FileUploadModule,
    TextMaskModule,
    SharedModule,
    UsersRoutingModule,
    MatSortModule
  ],
  declarations: [
    UsersTableComponent,
    UserEditComponent,
    UserNewComponent,
    FormStepperComponent,
    FormListComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    ErrorFiledComponent
  ],
})

export class UsersModule { }

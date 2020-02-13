import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material';


import { FileUploadModule } from '@iplab/ngx-file-upload';

import { TextMaskModule } from 'angular2-text-mask';

import { AppStoreModule } from '@app/store/store.module';

import { SharedModule } from '../shared/shared.module';

import { UsersStoreRoutingModule } from './users-store-routing.module';
import {
  UsersTableComponent,
  UserEditComponent,
  UserNewComponent,
  FormListComponent,
  FormStepperComponent,
  FirstStepComponent,
  SecondStepComponent,
  ThirdStepComponent,
  TableFilterComponent
} from './components'; 

import { ErrorFiledComponent } from '@core/components';

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
    UsersStoreRoutingModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AppStoreModule
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
    TableFilterComponent,
    ErrorFiledComponent,
  ],
  // providers: [MatDatepickerModule]
})

export class UsersStoreModule { }

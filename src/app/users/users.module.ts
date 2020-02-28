import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatStepperModule,
  MatToolbarModule,
  MatTabsModule,
  MatSnackBarModule,
  MatSortModule,
  MatSelectModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
} from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ErrorFiledComponent } from '@core/components';

import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './services';
import {
  UsersTableComponent,
  UserEditComponent,
  UserCreateComponent,
  FormListComponent,
  FormStepperComponent,
  FirstStepComponent,
  SecondStepComponent,
  ThirdStepComponent,
  TableFilterComponent
} from './components';
import { TabDirective } from './directives';

@NgModule({
  imports: [
    // Angular
    ReactiveFormsModule,
    FileUploadModule,
    TextMaskModule,
    SharedModule,
    UsersRoutingModule,
    // Material
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  declarations: [
    UsersTableComponent,
    UserEditComponent,
    UserCreateComponent,
    FormStepperComponent,
    FormListComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    TableFilterComponent,
    ErrorFiledComponent,
    TabDirective,
  ],
  providers: [UsersService],
})

export class UsersModule { }

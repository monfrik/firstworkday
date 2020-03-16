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
  MatProgressSpinnerModule,
} from '@angular/material';

import { FileUploadModule } from '@iplab/ngx-file-upload';

import { TextMaskModule } from 'angular2-text-mask';

// import { PhoneInputModule } from 'phone-input';

import { ErrorFiledComponent } from '@core/components';
import { SharedModule } from '@app/shared/shared.module';
import { PhoneInputModule } from '@app/shared/phone-input';

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
  TableFilterComponent,
  FormsGroupComponent,
} from './components';
import { TabDirective } from './directives';

@NgModule({
  imports: [
    // Angular
    ReactiveFormsModule,
    FileUploadModule,
    TextMaskModule,
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
    MatProgressSpinnerModule,
    // Shared
    SharedModule,
    // Other
    PhoneInputModule,
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
    FormsGroupComponent,
  ],
  providers: [UsersService],
})

export class UsersModule { }

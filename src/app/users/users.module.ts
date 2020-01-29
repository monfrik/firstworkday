import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { FileUploadModule } from '@iplab/ngx-file-upload';

import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
import { UsersTableComponent } from './components/users-table';
import { UsersRoutingModule } from './users-routing.module';
import { UserEditComponent } from './components/user-edit';
import { UserNewComponent } from './components/user-new';
import { FormStepperComponent } from './components/form-stepper';
import { FormListComponent } from './components/form-list';
import { FirstStepComponent } from './components/form-stepper/components/first-step';
import { SecondStepComponent } from './components/form-stepper/components/second-step';
import { ThirdStepComponent } from './components/form-stepper/components/third-step';


@NgModule({
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    FileUploadModule,
    TextMaskModule,
    SharedModule,
    UsersRoutingModule,
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
  ],
})
export class UsersModule { }

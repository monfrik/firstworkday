import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatSelectModule,
} from '@angular/material';

import { DisableControlDirective } from '../directives';

import { PhoneInputComponent } from './components';

@NgModule({
  declarations: [
    DisableControlDirective,
    PhoneInputComponent
  ],
  imports: [
    // Angular
    ReactiveFormsModule,
    CommonModule,
    // Material
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    PhoneInputComponent
  ]
})

export class PhoneInputModule { }

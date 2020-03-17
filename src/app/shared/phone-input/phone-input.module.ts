import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatSelectModule,
} from '@angular/material';

import { PhoneInputComponent } from './components';
import { DisableControlDirective } from './directives';

@NgModule({
  declarations: [
    DisableControlDirective,
    PhoneInputComponent,
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
    PhoneInputComponent,
  ],
})

export class PhoneInputModule { }

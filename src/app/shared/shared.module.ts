import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatPaginatorModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
  ],
  declarations: [ ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class SharedModule { }
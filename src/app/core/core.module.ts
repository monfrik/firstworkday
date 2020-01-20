import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  declarations: [
  ],
  exports: [
    HttpClientModule,
  ],
})
export class CoreModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { HelloFreshService } from '@shared/hello-fresh/hello-fresh.service';
import { ColruytService } from '@shared/colruyt/colruyt.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent],
  providers: [
    HelloFreshService,
    ColruytService,
    BsModalService
  ],
  exports: [LoaderComponent]
})
export class SharedModule {
}

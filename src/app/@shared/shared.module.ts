import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [CommonModule, NgxUiLoaderModule],
  declarations: [LoaderComponent],
  providers: [BsModalService],
  exports: [LoaderComponent, NgxUiLoaderModule],
})
export class SharedModule {}

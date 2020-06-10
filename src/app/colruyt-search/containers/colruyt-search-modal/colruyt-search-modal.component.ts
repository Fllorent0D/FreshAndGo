import { Component, Input, OnInit } from '@angular/core';
import { Ingredient, IngredientReference } from '@core/services/hello-fresh/hello-fresh.models';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-colruyt-search-modal',
  templateUrl: './colruyt-search-modal.component.html',
  styleUrls: ['./colruyt-search-modal.component.scss']
})
export class ColruytSearchModalComponent {

  @Input() ingredient: Ingredient;
  @Input() yield: IngredientReference;

  constructor(private modalRef: BsModalRef) {
  }

  closeModal() {
    this.modalRef.hide();
  }
}

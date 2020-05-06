import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColruytSearchItem } from '@shared/colruyt/colruyt.model';
import { ColruytQuantity } from '@app/home/colruyt-search/colruyt-add-to-basket/colruyt-add-to-basket.component';

export interface ColruytAddToBasketItem {
  quantity: ColruytQuantity;
  item: ColruytSearchItem
}

@Component({
  selector: 'app-colruyt-search-item',
  templateUrl: './colruyt-search-item.component.html',
  styleUrls: ['./colruyt-search-item.component.scss']
})
export class ColruytSearchItemComponent implements OnInit {

  @Input() item: ColruytSearchItem;
  @Output() addToBasket: EventEmitter<ColruytAddToBasketItem> = new EventEmitter<ColruytAddToBasketItem>();

  constructor() {
  }

  ngOnInit(): void {
  }

  submit(quantity: ColruytQuantity) {
    this.addToBasket.emit({
      quantity,
      item: this.item
    });
  }

}

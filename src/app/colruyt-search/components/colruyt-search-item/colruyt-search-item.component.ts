import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColruytQuantity } from '@app/colruyt-search/components/colruyt-add-to-basket/colruyt-add-to-basket.component';
import { ColruytSearchItem } from '@core/services/colruyt/colruyt.model';

export interface ColruytAddToBasketItem {
  quantity: ColruytQuantity;
  item: ColruytSearchItem;
}

@Component({
  selector: 'app-colruyt-search-item',
  templateUrl: './colruyt-search-item.component.html',
  styleUrls: ['./colruyt-search-item.component.scss'],
})
export class ColruytSearchItemComponent implements OnInit {
  @Input() item: ColruytSearchItem;
  @Output() addToBasket: EventEmitter<ColruytAddToBasketItem> = new EventEmitter<ColruytAddToBasketItem>();

  constructor() {}

  ngOnInit(): void {}

  submit(quantity: ColruytQuantity) {
    this.addToBasket.emit({
      quantity,
      item: this.item,
    });
  }
}

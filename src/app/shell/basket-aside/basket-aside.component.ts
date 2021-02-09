import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColruytBasketArticle, ColruytShowBasket } from '@core/services/colruyt/colruyt.model';

@Component({
  selector: 'app-basket-aside',
  templateUrl: './basket-aside.component.html',
  styleUrls: ['./basket-aside.component.scss'],
})
export class BasketAsideComponent implements OnInit {
  @Input() basket: ColruytShowBasket | null;
  @Output() removeFromBasket: EventEmitter<ColruytBasketArticle> = new EventEmitter<ColruytBasketArticle>();
  constructor() {}

  ngOnInit(): void {}
}

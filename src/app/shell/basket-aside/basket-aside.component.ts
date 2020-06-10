import { Component, Input, OnInit } from '@angular/core';
import { ColruytShowBasket } from '@core/services/colruyt/colruyt.model';

@Component({
  selector: 'app-basket-aside',
  templateUrl: './basket-aside.component.html',
  styleUrls: ['./basket-aside.component.scss']
})
export class BasketAsideComponent implements OnInit {
  @Input() basket: ColruytShowBasket | null;

  constructor() {
  }

  ngOnInit(): void {
  }
}

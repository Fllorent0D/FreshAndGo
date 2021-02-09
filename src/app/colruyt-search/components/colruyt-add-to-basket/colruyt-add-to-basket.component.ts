import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ColruytUnit } from '@core/services/colruyt/colruyt.model';
import { PriceService } from '@shared/price/price.service';

export interface ColruytQuantity {
  unit: ColruytUnit;
  quantity: number;
}

@Component({
  selector: 'app-colruyt-add-to-basket',
  templateUrl: './colruyt-add-to-basket.component.html',
  styleUrls: ['./colruyt-add-to-basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColruytAddToBasketComponent implements OnInit {
  _defaultQuantity: number;
  _discountPrice: number;
  _discountQuantity: number;
  _unitPrice: number;

  @Input() unit: ColruytUnit;

  @Input() set defaultQuantity(defaultQuantity: string | number) {
    this._defaultQuantity = PriceService.ParseNumber(defaultQuantity);
  }

  @Input() set unitPrice(unitPrice: string | number) {
    this._unitPrice = PriceService.ParseNumber(unitPrice);
  }

  @Input() priceFn: string;
  @Input() displayDiscount = false;

  @Input() set discountPrice(unitPrice: string | number) {
    console.log('discount unit price', unitPrice);
    this._discountPrice = PriceService.ParseNumber(unitPrice);
  }

  @Input() set discountQuantity(quantity: string | number) {
    this._discountQuantity = PriceService.ParseNumber(quantity);
  }

  @Output() addToBasket: EventEmitter<ColruytQuantity> = new EventEmitter<ColruytQuantity>();

  input: FormControl;

  get price() {
    const quantity = this.input.value;
    switch (this.unit) {
      case ColruytUnit.PIECE:
        const test = new Function('return ' + this.priceFn)();
        return test(quantity, this.unit);
        break;
      case ColruytUnit.KG:
        if (quantity >= this._discountQuantity) {
          return (quantity * this._discountPrice) / 1000;
        } else {
          return (quantity * this._unitPrice) / 1000;
        }
        break;
    }
  }

  add() {
    switch (this.unit) {
      case ColruytUnit.PIECE:
        this.input.patchValue(this.input.value + 1);

        break;
      case ColruytUnit.KG:
        this.input.patchValue(this.input.value + 50);
        break;
    }
  }

  minus() {
    if (this.input.value <= 0) {
      return;
    }

    switch (this.unit) {
      case ColruytUnit.PIECE:
        this.input.patchValue(this.input.value - 1);
        break;
      case ColruytUnit.KG:
        this.input.patchValue(this.input.value - 50);
        break;
    }
  }

  ngOnInit(): void {
    this.input = new FormControl(this._defaultQuantity, [Validators.required]);
  }

  submit() {
    this.addToBasket.emit({
      quantity: this.input.value,
      unit: this.unit,
    });
  }
}

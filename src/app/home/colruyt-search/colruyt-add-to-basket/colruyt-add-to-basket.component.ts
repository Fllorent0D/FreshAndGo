import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ColruytUnit } from '@shared/colruyt/colruyt.model';

export interface ColruytQuantity {
  unit: ColruytUnit;
  quantity: number;
}


@Component({
  selector: 'app-colruyt-add-to-basket',
  templateUrl: './colruyt-add-to-basket.component.html',
  styleUrls: ['./colruyt-add-to-basket.component.scss']
})
export class ColruytAddToBasketComponent implements OnInit {

  _defaultQuantity: number;
  _unitPrice: number;


  @Input() unit: ColruytUnit;

  @Input() set defaultQuantity(defaultQuantity: string | number) {
    if (typeof defaultQuantity === 'string') {
      this._defaultQuantity = Number(defaultQuantity);
    } else {
      this._defaultQuantity = defaultQuantity;
    }
  }

  @Input() set unitPrice(unitPrice: string | number) {
    if (typeof unitPrice === 'string') {
      this._unitPrice = Number(unitPrice.replace(',', '.'));
    } else {
      this._unitPrice = unitPrice;
    }
  }

  @Input() priceFn: string;

  @Output() addToBasket: EventEmitter<ColruytQuantity> = new EventEmitter<ColruytQuantity>();
  input: FormControl;

  get price() {
    const quantity = this.input.value;
    switch (this.unit) {
      case ColruytUnit.PIECE:
        const test = new Function('return ' + this.priceFn)()
        return test(quantity, this.unit);
        break;
      case ColruytUnit.KG:
        return (quantity * this._unitPrice) / 1000;
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


  submit(){
    this.addToBasket.emit({
      quantity: this.input.value,
      unit: this.unit
    });
  }


}

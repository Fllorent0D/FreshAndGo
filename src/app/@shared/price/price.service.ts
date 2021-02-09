import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  static ParseNumber(price: string | number) {
    if (typeof price === 'string') {
      return Number(price.replace(',', '.'));
    } else {
      return price;
    }
  }
}

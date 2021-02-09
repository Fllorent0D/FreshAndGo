import { Pipe, PipeTransform } from '@angular/core';
import { create, all } from 'mathjs';

@Pipe({ name: 'unit' })
export class UnitPipe implements PipeTransform {
  private math: any;

  constructor() {
    this.math = create(all, {});
  }

  transform(value: number, unitFrom: string, unitTo?: string): any {
    if (value) {
      const metric = unitTo ? this.math.evaluate(`${value} ${unitFrom} to ${unitTo}`) : this.math.unit(value, unitFrom);
      return unitFrom === 'VAR' ? metric.value.im : metric.toNumber();
    } else {
      return '';
    }
  }
}

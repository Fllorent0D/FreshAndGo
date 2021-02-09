import { ColruytAddToBasketResponse, ColruytSearchItem, ColruytUnit } from '@core/services/colruyt/colruyt.model';

export class ColruytRefreshBasket {
  static readonly type = '[Colruyt] Refresh Basket';
}

export class ColruytAddToBasket {
  static readonly type = '[Colruyt] Add to basket';

  constructor(
    public item: ColruytSearchItem,
    public unit: ColruytUnit,
    public quantity: number,
    public comment?: string
  ) {}
}

export class ColruytAddToBasketFailure {
  static readonly type = '[Colruyt] Add to basket Failure';

  constructor() {}
}

export class ColruytAddToBasketSuccess {
  static readonly type = '[Colruyt] Add to basket success';

  constructor(public addToBasketResponse: ColruytAddToBasketResponse, public colruytSearchItem: ColruytSearchItem) {}
}

export class ColruytRemoveFromBasket {
  static readonly type = '[Colruyt] Remove to basket';

  constructor(public itemsIds: string[]) {}
}

export class ColruytRemoveFromBasketFailure {
  static readonly type = '[Colruyt] Remove to basket Failure';

  constructor() {}
}

export class ColruytRemoveFromBasketSuccess {
  static readonly type = '[Colruyt] Remove to basket success';

  constructor() {}
}

export class ColruytClearBasket {
  static readonly type = '[Colruyt] Clear Basket';

  constructor() {}
}

export class ColruytClearBasketSuccess {
  static readonly type = '[Colruyt] Clear Basket success';

  constructor() {}
}

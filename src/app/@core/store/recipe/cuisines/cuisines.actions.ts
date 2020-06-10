import { Cuisine } from '@core/services/hello-fresh/hello-fresh.models';

export class FetchCuisines {
  static readonly type = '[HelloFresh] Fetch cuisines';

  constructor() {}
}

export class FetchCuisinesSuccess {
  static readonly type = '[HelloFresh] Fetch cuisines success';

  constructor(public cuisines: Cuisine[]) {}
}

export class FetchCuisinesFailure {
  static readonly type = '[HelloFresh] Fetch cuisines failure';

  constructor() {}
}

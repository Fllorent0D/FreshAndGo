export class ColruytRefreshBasket {
  static readonly type = '[Colruyt] Refresh Basket';
}

export class ColruytLogin {
  static readonly type = '[Colruyt] login';
  constructor(public username: string, public password: string) {}
}

export class ColruytLogout {
  static readonly type = '[Colruyt] Logout';
}

export class ColruytLoginSuccess {
  static readonly type = '[Colruyt] Login Success';
}

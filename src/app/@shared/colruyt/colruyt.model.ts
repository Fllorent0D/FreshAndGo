export interface ColruytParam {
  string: string;
  'string-array': string[];
}

export interface ColruytStatus {
  code: number;
  meaning: string;
}

export interface ColruytCogomwBoRestTreeBranch {
  id: string;
  description: string;
}

export enum ColruytUnit {
  PIECE = 'S',
  KG = 'G'
}

export interface ColruytSearchItem {
  id: string;
  brand: string;
  description: string;
  overviewImage: string;
  units: ColruytUnit[];
  defaultUnit: ColruytUnit;
  price: string;
  priceUnit: string;
  unitPrice: string;
  unitPriceUnit: string;
  discountPrice: string;
  discountPriceUnit: string;
  discountQuantity: string;
  discountSalableWeightCode: string;
  discountSalableQuantity: string;
  priceFunction: string;
  saleable: boolean;
  defaultQuantity: string;
  ficEnabled: boolean;
  redPrice?: boolean;
  bio?: boolean;
}

export interface ColruytSearchResult {
  'colruyt.cogomw.bo.RestTreeBranch': ColruytCogomwBoRestTreeBranch;
  list: ColruytSearchItem[];
}

export interface ColruytSearchResultResponse {
  searchResults: ColruytSearchResult[];
}

export interface ColruytAddToBasketResponse {
  '@class': string;
  id: string;
  comment: string;
  unit: string;
  quantity: string;
  lineTotalPrice: string;
}

export interface ColruytResponse<T> {
  params: ColruytParam[];
  status: ColruytStatus;
  data: T;
}

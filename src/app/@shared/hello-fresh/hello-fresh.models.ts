export interface Nutrition {
  type: string;
  name: string;
  amount: number;
  unit: string;
}



export interface UsageByCountry {
  AO: number;
  AT: number;
  AU: number;
  BE: number;
  CA: number;
  CH: number;
  CK: number;
  DE: number;
  DK: number;
  ER: number;
  FR: number;
  GB: number;
  LU: number;
  NL: number;
  NZ: number;
  SE: number;
  US: number;
}

export interface Family {
  id: string;
  type: string;
  name: string;
  slug: string;
  description?: any;
  priority: number;
  iconLink: string;
  iconPath: string;
  usageByCountry: UsageByCountry;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  country: string;
  id: string;
  type: string;
  name: string;
  slug: string;
  description?: any;
  internalName: string;
  shipped: boolean;
  imageLink: string;
  imagePath: string;
  usage: number;
  hasDuplicatedName?: any;
  allergens: Allergen[];
  family: Family;
}
export interface Allergen {
  id: string;
  type: string;
  name: string;
  slug: string;
  description?: any;
  tracesOf: boolean;
  triggersTracesOf: boolean;
  iconLink: string;
  iconPath: string;
  usage: number;
}

export interface Utensil {
  id: string;
  type: string;
  name: string;
}

export interface NumberOfRecipesByCountry {
  AO: number;
  AT: number;
  AU: number;
  BE: number;
  CA: number;
  CH: number;
  CK: number;
  DE: number;
  DK: number;
  ER: number;
  FR: number;
  GB: number;
  LU: number;
  NL: number;
  NZ: number;
  SE: number;
  US: number;
}

export interface Tag {
  id: string;
  type: string;
  name: string;
  slug: string;
  iconLink: string;
  iconPath: string;
  numberOfRecipes: number;
  numberOfRecipesByCountry: NumberOfRecipesByCountry;
}

export interface Cuisine {
  id: string;
  type: string;
  name: string;
  slug: string;
  iconLink: string;
  iconPath: string;
  usage: number;
}

export interface IngredientReference {
  id: string;
  amount?: number;
  unit: string;
}

export interface Yield {
  yields: number;
  ingredients: IngredientReference[];
}

export interface Timer {
  name: string;
  duration: string;
  temperature?: number;
  temperatureUnit?: any;
  ovenMode?: any;
}

export interface Image {
  link: string;
  path: string;
  caption: string;
}

export interface Step {
  index: number;
  instructionsMarkdown: string;
  instructionsHTML: string;
  instructions: string;
  timers: Timer[];
  images: Image[];
  videos: any[];
  ingredients: string[];
  utensils: string[];
}

export interface Recipe {
  country: string;
  id: string;
  name: string;
  seoName?: any;
  category?: any;
  slug: string;
  headline: string;
  description: string;
  descriptionHTML: string;
  descriptionMarkdown: string;
  seoDescription?: any;
  comment: string;
  difficulty: number;
  prepTime: string;
  totalTime?: any;
  servingSize: number;
  createdAt: Date;
  updatedAt: Date;
  link: string;
  imageLink: string;
  imagePath: string;
  cardLink?: any;
  videoLink?: any;
  nutrition: Nutrition[];
  ingredients: Ingredient[];
  allergens: Allergen[];
  utensils: Utensil[];
  tags: Tag[];
  cuisines: Cuisine[];
  wines: any[];
  marketplaceItems: any[];
  author?: any;
  label?: any;
  yieldType: string;
  yields: Yield[];
  steps: Step[];
  averageRating?: any;
  ratingsCount?: any;
  favoritesCount?: any;
  active: boolean;
  highlighted: boolean;
  isDinnerToLunch: boolean;
  isExcludedFromIndex: boolean;
  isPremium: boolean;
  websiteUrl: string;
  clonedFrom?: any;
  canonical?: any;
  canonicalLink?: any;
}

export interface HelloFreshListResponse<T> {
  take: number;
  skip: number;
  count: number;
  total: number;
  items: T[];
}

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
  category?: Category;
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

export interface Preference {
  preset: string;
  recommended: number[];
  other: number[];
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

export interface Label {
  text: string;
  handle: string;
  backgroundColor: string;
  foregroundColor: string;
}

export interface ChargeSetting {
  amount: number;
  strategy: string;
  reason: string;
  flexibleAmounts?: any;
  flexibleQuantities?: any;
}

export interface Cours {
  index: number;
  recipe: Recipe;
  presets?: any;
  selectionLimit?: any;
  chargeSetting: ChargeSetting;
  isSoldOut: boolean;
}

export interface WeeklyMenu {
  id: string;
  country: string;
  product: string;
  week: string;
  headline: string;
  mealSwapCombinationsText?: any;
  mealSwapCombinations: any[];
  serializedPreferences: string;
  preferences: Preference[];
  link: string;
  isActive: boolean;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  clonedFrom?: any;
  surveyTitle?: any;
  surveyQuestion?: any;
  surveyBody?: any;
  surveyOptIn?: any;
  rated: number;
  averageRating: number;
  courses: Cours[];
  modularity: any[];
}

export interface HelloFreshSearchSuggestion {
  title: string;
  recipeId: string;
  slug: string;
  headline: string;
  image: string;
}

export interface HelloFreshSearchSuggestionsResult {
  group: string;
  group_title: string;
  items: HelloFreshSearchSuggestion[];
}
export interface Category {
  id: string;
  type: string;
  name: string;
  slug: string;
  iconLink?: any;
  iconPath: string;
  usage: number;
}

export interface Preference {
  preset: string;
  recommended: number[];
  other: number[];
}

export interface ChargeSetting {
  amount: number;
  strategy: string;
  reason: string;
  flexibleAmounts?: any;
  flexibleQuantities?: any;
}

export interface Cours {
  index: number;
  recipe: Recipe;
  presets?: any;
  selectionLimit?: any;
  chargeSetting: ChargeSetting;
  isSoldOut: boolean;
}

export interface WeeklyBoxes {
  id: string;
  country: string;
  product: string;
  week: string;
  headline: string;
  mealSwapCombinationsText?: any;
  mealSwapCombinations: any[];
  serializedPreferences: string;
  preferences: Preference[];
  link: string;
  isActive: boolean;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  clonedFrom?: any;
  surveyTitle?: any;
  surveyQuestion?: any;
  surveyBody?: any;
  surveyOptIn?: any;
  rated: number;
  averageRating: number;
  courses: Cours[];
  modularity: any[];
}

export type Ingredient = {
  ingredientName: String;
  ingredientBrand?: String;
  category?: String;
  location?: String;
  confectionType?: String;
  expirationDate?: Date;
  quantity?: String | number;
  timestamp: number;
  ripenessTimestamp: number;
  ripeness?: String;
};

export interface GroceryListIngredient extends Ingredient {
  bought: boolean;
}

export enum SelectionType {
  Category = 'Category',
  Location = 'Location',
  ConfectionType = 'Confection Type',
  Ripeness = 'Ripeness',
}

export enum FilterType {
  ExpiringSoon,
  Incomplete,
  RecentlyAdded,
  Category,
  Location,
  ConfectionType,
  GroceryList,
  RecentlyBought,
  Ripeness,
  NeedRipenessCheck,
}

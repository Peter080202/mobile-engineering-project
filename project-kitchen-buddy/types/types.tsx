export type Ingredient = {
  timestamp: number;
  ingredientName: String;
  ingredientBrand?: String;
  category?: String;
  location?: String;
  confectionType?: String;
  expirationDate?: Date;
  quantity?: String | number;
  ripeness?: String;
  ripenessTimestamp?: number;
  open?: Boolean;
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
  Ripeness,
  NeedRipenessCheck,
  GroceryList,
  RecentlyBought,
}

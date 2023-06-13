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
  shop?: string;
};

export interface GroceryListIngredient extends Ingredient {
  bought: boolean;
}

export interface Shop {
  name: string;
  latitude: number;
  longitude: number;
  type: string[];
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

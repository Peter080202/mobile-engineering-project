export type Ingredient = {
  ingredientName: String;
  category?: String;
  location?: String;
  confectionType?: String;
  expirationDate?: Date;
  timestamp: number;
};

export enum SelectionType {
  Category = 'Category',
  Location = 'Location',
  ConfectionType = 'Confection Type',
}

export enum FilterType {
  ExpiringSoon,
  Incomplete,
  RecentlyAdded,
  Category,
  Location,
  ConfectionType,
}

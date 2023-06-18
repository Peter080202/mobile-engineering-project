import {GroceryListIngredient, Ingredient} from '../types/types';

export const getFormattedDate = (date: Date): string => {
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}.${month}.${date.getFullYear()}`;
};

export const getDifferenceDaysFromNow = (date: Date) =>
  (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

export const getDifferenceDaysFromDateAndTimestamp = (
  date1: Date,
  date2: number,
) => date1.getTime() - date2;

export const getDiffFromPastTimestamp = (date: number): number => {
  const date2 = new Date(date);
  return (Date.now() - date2.getTime()) / (1000 * 60 * 60 * 24);
};

export const getDateSixMonths = (givenDate: Date | undefined): Date => {
  let futureDate = new Date();

  if (givenDate instanceof Date) {
    futureDate = new Date(givenDate);
  }

  futureDate.setMonth(futureDate.getMonth() + 6);

  return futureDate;
};

export const fromJSONToIngredient = (json: any): Ingredient => {
  return {
    ingredientName: json.ingredientName,
    ingredientBrand:
      json.ingredientBrand !== undefined ? json.ingredientBrand : undefined,
    category: json.category !== undefined ? json.category : undefined,
    location: json.location !== undefined ? json.location : undefined,
    confectionType:
      json.confectionType !== undefined ? json.confectionType : undefined,
    expirationDate:
      json.expirationDate !== undefined
        ? new Date(json.expirationDate)
        : undefined,
    quantity: json.quantity !== undefined ? json.quantity : undefined,
    ripeness: json.ripeness !== undefined ? json.ripeness : undefined,
    timestamp: json.timestamp !== undefined ? json.timestamp : undefined,
    ripenessTimestamp:
      json.ripenessTimestamp !== undefined ? json.ripenessTimestamp : undefined,
    open: json.open !== undefined ? json.open : undefined,
  };
};

export const fromJSONToGroceryListIngredient = (
  json: any,
): GroceryListIngredient => {
  return {
    ingredientName: json.ingredientName,
    ingredientBrand:
      json.ingredientBrand !== undefined ? json.ingredientBrand : undefined,
    category: json.category !== undefined ? json.category : undefined,
    location: json.location !== undefined ? json.location : undefined,
    confectionType:
      json.confectionType !== undefined ? json.confectionType : undefined,
    expirationDate:
      json.expirationDate !== undefined
        ? new Date(json.expirationDate)
        : undefined,
    quantity: json.quantity !== undefined ? json.quantity : undefined,
    ripeness: json.ripeness !== undefined ? json.ripeness : undefined,
    timestamp: json.timestamp !== undefined ? json.timestamp : undefined,
    ripenessTimestamp:
      json.ripenessTimestamp !== undefined ? json.ripenessTimestamp : undefined,
    open: json.open !== undefined ? json.open : undefined,
    bought: json.bought !== undefined ? json.bought : undefined,
  };
};

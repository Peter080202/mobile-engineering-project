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
) => (date1.getTime() - date2) / (1000 * 60 * 60 * 24);

export const getDiffFromPastTimestamp = (date: number): number => {
  const date2 = new Date(date);
  return (Date.now() - date2.getTime()) / (1000 * 60 * 60 * 24);
};

export const fromJSONToIngredient = (json: any): Ingredient => {
  return {
    ingredientName: json.ingredientName,
    ingredientBrand: json.ingredientBrand,
    category: json.category,
    location: json.location,
    confectionType: json.confectionType,
    expirationDate: new Date(json.expirationDate),
    quantity: json.quantity,
    ripeness: json.ripeness,
    timestamp: json.timestamp,
    ripenessTimestamp: json.ripenessTimestamp,
    open: json.open,
  };
};

export const fromJSONToGroceryListIngredient = (
  json: any,
): GroceryListIngredient => {
  return {
    ingredientName: json.ingredientName,
    ingredientBrand: json.ingredientBrand,
    category: json.category,
    location: json.location,
    confectionType: json.confectionType,
    expirationDate: new Date(json.expirationDate),
    quantity: json.quantity,
    ripeness: json.ripeness,
    timestamp: json.timestamp,
    ripenessTimestamp: json.ripenessTimestamp,
    open: json.open,
    bought: json.bought,
  };
};

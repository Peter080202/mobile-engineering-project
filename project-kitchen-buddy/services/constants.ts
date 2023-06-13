import {Ingredient} from '../types/types';
import {getDiffFromPastTimestamp, getDifferenceDaysFromNow} from './commons';

export const ingredientsStorageKey = '@ingredients_storage_key';
export const groceryListStorageKey = '@grocery_list_storage_key';
export const categories: string[] = [
  'fruit',
  'vegetable',
  'dairy',
  'fish',
  'meat',
  'liquid',
];

export const ripenesses: string[] = ['green', 'ripe', 'advanced', 'too ripe'];
export const locations: string[] = ['fridge', 'freezer', 'pantry'];
export const confectionTypes: string[] = ['fresh', 'canned', 'frozen', 'cured'];
export const quantityTypes: string[] = ['full', 'half empty', 'empty'];

// If the expiration date of the ingredient is within the next 7 days
export const expiringSoonIngredients = (
  ingredients: Ingredient[],
): Ingredient[] =>
  ingredients.filter(
    (ingredient: Ingredient) =>
      (ingredient.expirationDate &&
        getDifferenceDaysFromNow(ingredient.expirationDate) <= 7) ||
      (ingredient.confectionType === 'fresh' &&
        (ingredient.ripeness === 'ripe' ||
          ingredient.ripeness === 'advanced' ||
          ingredient.ripeness === 'too ripe')) ||
      ingredient.open,
  );

export const needRipenessCheckIngredients = (
  ingredients: Ingredient[],
): Ingredient[] =>
  ingredients.filter(
    (ingredient: Ingredient) =>
      ingredient.confectionType === 'fresh' &&
      ingredient.ripeness &&
      ingredient.ripenessTimestamp &&
      getDiffFromPastTimestamp(ingredient.ripenessTimestamp) >= 3,
  );

export const incompleteIngredients = (
  ingredients: Ingredient[],
): Ingredient[] =>
  ingredients.filter(
    (ingredient: Ingredient) =>
      !ingredient.ingredientBrand ||
      !ingredient.category ||
      !ingredient.location ||
      !ingredient.confectionType ||
      !ingredient.expirationDate ||
      !ingredient.quantity,
  );

// If the day edited is within the last three days
export const recentlyAddedIngredients = (
  ingredients: Ingredient[],
): Ingredient[] =>
  ingredients.filter(
    (ingredient: Ingredient) =>
      (Date.now() - ingredient.timestamp) / (1000 * 60 * 60 * 24) <= 3,
  );

export const groceryListIngredients = (
  ingredients: Ingredient[],
): Ingredient[] =>
  ingredients.filter(
    (ingredient: Ingredient) =>
      (ingredient.quantity &&
        typeof ingredient.quantity === 'number' &&
        ingredient.quantity < 10) ||
      (typeof ingredient.quantity === 'string' &&
        (ingredient.quantity === quantityTypes[1] ||
          ingredient.quantity === quantityTypes[2])),
  );

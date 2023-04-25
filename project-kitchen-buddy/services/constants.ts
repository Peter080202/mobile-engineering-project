import {testIngredients} from '../types/testdata';
import {Ingredient} from '../types/types';
import {getDifferenceDaysFromNow} from './commons';

export const categories: string[] = [
  'fruit',
  'vegetable',
  'dairy',
  'fish',
  'meat',
  'liquid',
];
export const locations: string[] = ['fridge', 'freezer', 'pantry'];
export const confectionTypes: string[] = ['fresh', 'canned', 'frozen', 'cured'];
// If the expiration date of the ingredient is within the next 7 days
export const expiringSoonIngredients: Ingredient[] = testIngredients.filter(
  (ingredient: Ingredient) =>
    ingredient.expirationDate &&
    getDifferenceDaysFromNow(ingredient.expirationDate) <= 7,
);
export const incompleteIngredients: Ingredient[] = testIngredients.filter(
  (ingredient: Ingredient) =>
    ingredient.category === undefined ||
    ingredient.location === undefined ||
    ingredient.confectionType === undefined ||
    ingredient.expirationDate === undefined,
);

export const recentlyAddedIngredients: Ingredient[] = testIngredients.filter(
  (ingredient: Ingredient) =>
    (Date.now() - ingredient.timestamp) / (1000 * 60 * 60 * 24) <= 3,
);
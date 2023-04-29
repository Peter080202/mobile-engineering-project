import {createSlice} from '@reduxjs/toolkit';
import {testIngredients} from '../types/testdata';
import {Ingredient} from '../types/types';

export const ingredientsReducer = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: testIngredients,
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    updateIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});

export const {addIngredient, updateIngredients} = ingredientsReducer.actions;

export const useIngredients = (state: {ingredients: {ingredients: any}}) =>
  state.ingredients.ingredients;

export default ingredientsReducer.reducer;
import {createSlice} from '@reduxjs/toolkit';
import {testIngredients} from '../types/testdata';

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
      state.ingredients = [
        ...state.ingredients.slice(0, action.payload.index),
        action.payload.ingredient,
        ...state.ingredients.slice(action.payload.index + 1),
      ];
    },
  },
});

export const {addIngredient, updateIngredients} = ingredientsReducer.actions;

export const useIngredients = (state: {ingredients: {ingredients: any}}) =>
  state.ingredients.ingredients;

export default ingredientsReducer.reducer;

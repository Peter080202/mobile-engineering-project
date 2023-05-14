import {createSlice} from '@reduxjs/toolkit';
import {testIngredients} from '../types/testdata';
import {Ingredient} from '../types/types';

export const groceryListReducer = createSlice({
  name: 'ingredients',
  initialState: {
    groceryList: [] as Ingredient[],
  },
  reducers: {
    addToGroceryList: (state, action) => {
      state.groceryList = [...state.groceryList, action.payload];
    },
    removeItemFromGroceryList: (state, action) => {
      state.groceryList = [...state.groceryList, action.payload];
    },
    updateIngredients: (state, action) => {
      state.groceryList = [
        ...state.groceryList.slice(0, action.payload.index),
        action.payload.ingredient,
        ...state.groceryList.slice(action.payload.index + 1),
      ];
    },
  },
});

export const {addToGroceryList, removeItemFromGroceryList} =
  groceryListReducer.actions;

export const useGroceryList = (state: {groceryList: {groceryList: any}}) =>
  state.groceryList.groceryList;

export default groceryListReducer.reducer;

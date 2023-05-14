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
    removeFromGroceryList: (state, action) => {
      state.groceryList = [
        ...state.groceryList.slice(0, action.payload),
        ...state.groceryList.slice(action.payload + 1),
      ];
    },
  },
});

export const {addToGroceryList, removeFromGroceryList} =
  groceryListReducer.actions;

export const useGroceryList = (state: {groceryList: {groceryList: any}}) =>
  state.groceryList.groceryList;

export default groceryListReducer.reducer;

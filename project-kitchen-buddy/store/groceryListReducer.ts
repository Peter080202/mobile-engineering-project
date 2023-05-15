import {createSlice} from '@reduxjs/toolkit';
import {GroceryListIngredient} from '../types/types';

export const groceryListReducer = createSlice({
  name: 'ingredients',
  initialState: {
    groceryList: [] as GroceryListIngredient[],
  },
  reducers: {
    addToGroceryList: (state, action) => {
      state.groceryList = [
        ...state.groceryList,
        {...action.payload, bought: false},
      ];
    },
    removeFromGroceryList: (state, action) => {
      state.groceryList = [
        ...state.groceryList.slice(0, action.payload),
        ...state.groceryList.slice(action.payload + 1),
      ];
    },
    boughtFromGroceryList: (state, action) => {
      state.groceryList[action.payload].bought = true;
    },
  },
});

export const {addToGroceryList, removeFromGroceryList, boughtFromGroceryList} =
  groceryListReducer.actions;

export const useGroceryList = (state: {groceryList: {groceryList: any}}) =>
  state.groceryList.groceryList;

export default groceryListReducer.reducer;

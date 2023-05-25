import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GroceryListIngredient} from '../types/types';
import {groceryListStorageKey} from '../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fromJSONToGroceryListIngredient} from '../services/commons';

export const getGroceryList = createAsyncThunk(
  groceryListStorageKey,
  async () =>
    await AsyncStorage.getItem(groceryListStorageKey).then(groceryList =>
      groceryList !== null ? JSON.parse(groceryList) : [],
    ),
);

const updateStorage = (groceryList: GroceryListIngredient[]) =>
  AsyncStorage.setItem(groceryListStorageKey, JSON.stringify(groceryList));

export const groceryListReducer = createSlice({
  name: 'groceryList',
  initialState: {
    groceryList: [] as GroceryListIngredient[],
  },
  reducers: {
    addToGroceryList: (state, action) => {
      state.groceryList = [
        ...state.groceryList,
        {...action.payload, bought: false},
      ];
      updateStorage(state.groceryList);
    },
    removeFromGroceryList: (state, action) => {
      state.groceryList = [
        ...state.groceryList.slice(0, action.payload),
        ...state.groceryList.slice(action.payload + 1),
      ];
      updateStorage(state.groceryList);
    },
    boughtFromGroceryList: (state, action) => {
      state.groceryList[action.payload].bought = true;
      updateStorage(state.groceryList);
    },
  },
  extraReducers(builder) {
    builder.addCase(getGroceryList.fulfilled, (state, action) => {
      state.groceryList = action.payload.map((groceryListIngredient: String) =>
        fromJSONToGroceryListIngredient(groceryListIngredient),
      );
    });
  },
});

export const {addToGroceryList, removeFromGroceryList, boughtFromGroceryList} =
  groceryListReducer.actions;

export const useGroceryList = (state: {groceryList: {groceryList: any}}) =>
  state.groceryList.groceryList;

export default groceryListReducer.reducer;

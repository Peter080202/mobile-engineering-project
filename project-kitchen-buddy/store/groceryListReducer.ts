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

const initialState = {
  groceryList: [] as GroceryListIngredient[],
  status: 'idle',
  error: '',
};

export const groceryListReducer = createSlice({
  name: 'groceryList',
  initialState,
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
    builder
      .addCase(getGroceryList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getGroceryList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const groceryList: GroceryListIngredient[] = [];
        for (let i = 0; i < action.payload.length; i++) {
          groceryList.push(fromJSONToGroceryListIngredient(action.payload[i]));
        }
        state.groceryList = groceryList;
      })
      .addCase(getGroceryList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const {addToGroceryList, removeFromGroceryList, boughtFromGroceryList} =
  groceryListReducer.actions;

export const useGroceryList = (state: {groceryList: {groceryList: any}}) =>
  state.groceryList.groceryList;

export default groceryListReducer.reducer;

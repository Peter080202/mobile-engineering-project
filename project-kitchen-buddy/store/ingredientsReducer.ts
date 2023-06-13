import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {testIngredients} from '../types/testdata';
import {ingredientsStorageKey} from '../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ingredient} from '../types/types';
import {fromJSONToIngredient} from '../services/commons';

export const getIngredients = createAsyncThunk(
  ingredientsStorageKey,
  async () =>
    await AsyncStorage.getItem(ingredientsStorageKey).then(ingredients => {
      if (ingredients !== null) {
        return JSON.parse(ingredients);
      }
      AsyncStorage.setItem(
        ingredientsStorageKey,
        JSON.stringify(testIngredients),
      );
      return JSON.stringify(testIngredients);
    }),
);

const updateStorage = (ingredients: Ingredient[]) =>
  AsyncStorage.setItem(ingredientsStorageKey, JSON.stringify(ingredients));

export const ingredientsReducer = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [] as Ingredient[],
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
      updateStorage(state.ingredients);
    },
    updateIngredients: (state, action) => {
      state.ingredients = [
        ...state.ingredients.slice(0, action.payload.index),
        action.payload.ingredient,
        ...state.ingredients.slice(action.payload.index + 1),
      ];
      updateStorage(state.ingredients);
    },
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.map((ingredient: String) =>
        fromJSONToIngredient(ingredient),
      );
    });
  },
});

export const {addIngredient, updateIngredients} = ingredientsReducer.actions;

export const useIngredients = (state: {
  ingredients: {ingredients: Ingredient[]};
}) => state.ingredients.ingredients;

export default ingredientsReducer.reducer;

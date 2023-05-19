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

const initialState = {
  ingredients: [] as Ingredient[],
  status: 'idle',
  error: '',
};

export const ingredientsReducer = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
      AsyncStorage.setItem(
        ingredientsStorageKey,
        JSON.stringify(state.ingredients),
      );
    },
    updateIngredients: (state, action) => {
      state.ingredients = [
        ...state.ingredients.slice(0, action.payload.index),
        action.payload.ingredient,
        ...state.ingredients.slice(action.payload.index + 1),
      ];

      AsyncStorage.setItem(
        ingredientsStorageKey,
        JSON.stringify(state.ingredients),
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getIngredients.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const ingredients: Ingredient[] = [];
        for (let i = 0; i < action.payload.length; i++) {
          ingredients.push(fromJSONToIngredient(action.payload[i]));
        }
        state.ingredients = ingredients;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const {addIngredient, updateIngredients} = ingredientsReducer.actions;

export const useIngredients = (state: {ingredients: {ingredients: any}}) =>
  state.ingredients.ingredients;

export default ingredientsReducer.reducer;

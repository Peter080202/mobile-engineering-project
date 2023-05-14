import {configureStore} from '@reduxjs/toolkit';
import searchPatternReducer from './searchPatternReducer';
import ingredientsReducer from './ingredientsReducer';
import groceryListReducer from './groceryListReducer';

export default configureStore({
  reducer: {
    searchPattern: searchPatternReducer,
    ingredients: ingredientsReducer,
    groceryList: groceryListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

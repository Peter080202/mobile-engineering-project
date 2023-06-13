import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import groceryListReducer from './groceryListReducer';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    groceryList: groceryListReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

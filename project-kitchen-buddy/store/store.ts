import {configureStore} from '@reduxjs/toolkit';
import searchPatternReducer from './searchPatternReducer';
import ingredientsReducer from './ingredientsReducer';

export default configureStore({
  reducer: {
    searchPattern: searchPatternReducer,
    ingredients: ingredientsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

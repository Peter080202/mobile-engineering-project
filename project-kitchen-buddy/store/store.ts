import {configureStore} from '@reduxjs/toolkit';
import searchPatternReducer from './searchPatternReducer';

export default configureStore({
  reducer: {
    searchPattern: searchPatternReducer,
  },
});

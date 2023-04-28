import {createSlice} from '@reduxjs/toolkit';

export const searchPatternReducer = createSlice({
  name: 'searchPattern',
  initialState: {
    value: '',
  },
  reducers: {
    updateSearchPattern: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {updateSearchPattern} = searchPatternReducer.actions;

export const useSearchPattern = (state: {searchPattern: {value: any}}) =>
  state.searchPattern.value;

export default searchPatternReducer.reducer;

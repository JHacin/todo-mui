import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialRootState } from '../../index';

const searchSlice = createSlice({
  name: 'search',
  initialState: initialRootState.search,
  reducers: {
    updateSearch(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;

export default searchSlice.reducer;

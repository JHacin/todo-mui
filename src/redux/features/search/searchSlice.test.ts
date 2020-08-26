import searchReducer, { updateSearch } from './searchSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { initialRootState, RootState } from '../../index';

describe('search reducer', () => {
  it('should handle initial state', () => {
    expect(searchReducer(undefined, {} as AnyAction)).toEqual(initialRootState.search);
  });

  it('should handle updateSearch', () => {
    const search = 'wash the dog';

    expect(
      searchReducer(initialRootState.search, {
        type: updateSearch.type,
        payload: search,
      })
    ).toEqual<RootState['search']>(search);
  });
});

import React from 'react';
import { render, screen } from '../../../test-utils';
import * as reduxStore from '../../../redux/store';
import { initialRootState } from '../../../redux';
import { TodoSearchInput } from './index';
import * as searchSlice from '../../../redux/features/search/searchSlice';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

const spy = jest.spyOn(searchSlice, 'updateSearch');

jest.useFakeTimers();

describe('SearchInput', () => {
  it('handles preloaded state', () => {
    const store = reduxStore.initStore({
      fallbackState: {
        ...initialRootState,
        search: 'Walk the cat',
      },
    });

    render(<TodoSearchInput />, { store });

    expect(screen.getByPlaceholderText(/find a task.../i)).toHaveValue('Walk the cat');
  });

  it('dispatches an updateSearch action', () => {
    render(<TodoSearchInput />);

    userEvent.type(screen.getByPlaceholderText(/find a task.../i), 'Lorem ipsum');

    act(() => {
      jest.runAllTimers();
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Lorem ipsum');
  });
});

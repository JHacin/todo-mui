import React from 'react';
import { App } from '../../App';
import { createRandomTodo, render } from '../../test-utils';
import { getPersistedState, initStore, persistState } from './index';
import { addTodo } from '../features/todos/todosSlice';

export const createRandomInitialState = () => {
  const todo = createRandomTodo();

  const initialState = {
    todos: {
      ids: [todo.id],
      byId: { [todo.id]: todo },
    },
  };

  return { todo, initialState };
};

describe('redux store', () => {
  it('is created with the default initial state', () => {
    render(<App />);
  });

  it('can be created with custom initial state', () => {
    const { todo, initialState } = createRandomInitialState();
    const { getByText } = render(<App />, { initialState });
    expect(getByText(todo.text)).toBeVisible();
  });

  it('stores updates into localStorage', () => {
    const store = initStore();
    render(<App />, { store });

    const { todo, initialState } = createRandomInitialState();
    store.dispatch({
      type: addTodo.type,
      payload: { todo },
    });

    const localStorageState = getPersistedState();
    expect(localStorageState).toEqual(initialState);
  });

  it('hydrates the initial state from localStorage', () => {
    const { initialState } = createRandomInitialState();
    persistState(initialState);

    const store = initStore();
    render(<App />, { store });

    expect(store.getState()).toEqual(initialState);
  });
});

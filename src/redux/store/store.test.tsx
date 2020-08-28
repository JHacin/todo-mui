import React from 'react';
import { App } from '../../components/App';
import { render, screen } from '../../test-utils';
import { getPersistedState, initStore, persistState } from './index';
import { addTodo } from '../features/todos/todosSlice';
import { createRandomTodo, generateMockTodoState } from '../../test-utils/mock-generators';
import { initialRootState } from '../index';

export const createRandomInitialState = () => {
  const todo = createRandomTodo();
  const initialState = {
    ...initialRootState,
    todos: generateMockTodoState([todo]),
  };

  return { todo, initialState };
};

describe('redux store', () => {
  it('can be created with custom initial state', () => {
    const { todo, initialState } = createRandomInitialState();
    render(<App />, { initialState });
    expect(screen.getByText(todo.text)).toBeVisible();
  });

  it('stores updates into localStorage', () => {
    const store = initStore();
    render(<App />, { store });

    const { todo, initialState } = createRandomInitialState();
    store.dispatch({
      type: addTodo.type,
      payload: todo,
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

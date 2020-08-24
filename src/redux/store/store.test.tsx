import React from 'react';
import { App } from '../../App';
import { createRandomTodo, render } from '../../test-utils';
import { initStore, LOCAL_STORAGE_PERSISTED_STATE_KEY, RootState } from './index';
import { addTodo } from '../features/todos/todosSlice';

describe('redux store', () => {
  it('is created with the default initial state', () => {
    render(<App />);
  });

  it('can be created with custom initial state', () => {
    const todo = createRandomTodo();
    const initialState = {
      todos: {
        ids: [todo.id],
        byId: { [todo.id]: todo },
      },
    };

    const { getByText } = render(<App />, { initialState });
    expect(getByText(todo.text)).toBeVisible();
  });

  it('stores updates into localStorage', () => {
    const store = initStore();
    render(<App />, { store });

    const todo = createRandomTodo();
    store.dispatch({
      type: addTodo.type,
      payload: { todo },
    });

    const localStorageState = localStorage.getItem(LOCAL_STORAGE_PERSISTED_STATE_KEY);
    expect(localStorageState).not.toBeNull();

    const parsedState = JSON.parse(localStorageState!);
    expect(parsedState).toEqual<RootState>({
      todos: {
        ids: [todo.id],
        byId: {
          [todo.id]: todo,
        },
      },
    });
  });
});

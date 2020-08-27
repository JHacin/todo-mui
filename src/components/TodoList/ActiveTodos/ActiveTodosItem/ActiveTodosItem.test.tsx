import React from 'react';
import { createRandomTodo, render, screen } from '../../../../test-utils';
import { TodoStatus } from '../../../../types';
import { initStore } from '../../../../redux/store';
import { initialRootState, RootState } from '../../../../redux';
import { ActiveTodosItem } from './index';
import { EnhancedStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

describe('ActiveTodosItem', () => {
  const todo = createRandomTodo();
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: {
          order: [todo.id],
          byId: {
            [todo.id]: todo,
          },
        },
      },
    });
    render(<ActiveTodosItem todo={todo} />, { store });
  });

  it('allows completing todos', () => {
    expect(store.getState().todos.byId[todo.id].status).toEqual(TodoStatus.Active);
    userEvent.click(screen.getByRole('checkbox'));
    expect(store.getState().todos.byId[todo.id].status).toEqual(TodoStatus.Completed);
  });

  it('allows toggling between edit and view modes', () => {
    expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('active-todo-edit-toggle'));
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    userEvent.click(screen.getByTestId('active-todo-edit-toggle'));
    expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument();
  });
});

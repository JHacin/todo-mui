import React from 'react';
import { render, screen } from '../../../../test-utils';
import { TodoStatus } from '../../../../types';
import { initStore } from '../../../../redux/store';
import { initialRootState, RootState } from '../../../../redux';
import { ActiveTodosItem } from './index';
import { EnhancedStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { createRandomTodo, generateMockTodoState } from '../../../../test-utils/mock-generators';

const getUpdateButton = () => screen.queryByRole('button', { name: /update/i });
const getEditButton = () => screen.getByTestId('active-todo-edit-toggle');

describe('ActiveTodosItem', () => {
  const todo = createRandomTodo();
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: generateMockTodoState([todo]),
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
    expect(getUpdateButton()).not.toBeInTheDocument();
    userEvent.click(getEditButton());
    expect(getUpdateButton()).toBeInTheDocument();
    userEvent.click(getEditButton());
    expect(getUpdateButton()).not.toBeInTheDocument();
  });
});

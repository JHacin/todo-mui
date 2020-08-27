import React from 'react';
import { createRandomTodo, render, screen } from '../../../test-utils';
import { initStore } from '../../../redux/store';
import { initialRootState } from '../../../redux';
import { DeleteTodoButton } from './index';
import userEvent from '@testing-library/user-event';

describe('DeleteTodoButton', () => {
  it('deletes a todo', () => {
    const todo = createRandomTodo();

    const store = initStore({
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

    render(<DeleteTodoButton todo={todo} />, { store });
    expect(store.getState().todos.order.includes(todo.id)).toEqual(true);

    userEvent.click(screen.getByRole('button'));
    expect(store.getState().todos.order.includes(todo.id)).toEqual(false);
  });
});

import React from 'react';
import { render, screen } from '../../../test-utils';
import { initStore } from '../../../redux/store';
import { initialRootState } from '../../../redux';
import { DeleteTodoButton } from './index';
import userEvent from '@testing-library/user-event';
import { createRandomTodo, generateMockTodoState } from '../../../test-utils/mock-generators';

describe('DeleteTodoButton', () => {
  it('deletes a todo', () => {
    const todo = createRandomTodo();

    const store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: generateMockTodoState([todo]),
      },
    });

    render(<DeleteTodoButton todo={todo} />, { store });
    expect(store.getState().todos.order.includes(todo.id)).toEqual(true);

    userEvent.click(screen.getByRole('button'));
    expect(store.getState().todos.order.includes(todo.id)).toEqual(false);
  });
});

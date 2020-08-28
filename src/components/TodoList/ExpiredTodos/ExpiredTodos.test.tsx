import React from 'react';
import { render, screen } from '../../../test-utils';
import { ExpiredTodos } from './index';
import { initStore } from '../../../redux/store';
import { initialRootState } from '../../../redux';
import { TodoStatus } from '../../../types';
import { createRandomTodo, generateMockTodoState } from '../../../test-utils/mock-generators';

describe('ExpiredTodos', () => {
  it('does not render anything if there are no expired todos', async () => {
    render(<ExpiredTodos />);
    const list = screen.queryByText(/overdue/i);
    expect(list).not.toBeInTheDocument();
  });

  it('renders only expired todos', () => {
    const activeTodo = createRandomTodo({ status: TodoStatus.Active, text: 'Active' });
    const expiredTodo1 = createRandomTodo({ status: TodoStatus.Expired, text: 'Expired1' });
    const expiredTodo2 = createRandomTodo({ status: TodoStatus.Expired, text: 'Expired2' });

    const store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: generateMockTodoState([activeTodo, expiredTodo1, expiredTodo2]),
      },
    });

    render(<ExpiredTodos />, { store });

    expect(screen.getByText(/overdue/i)).toBeInTheDocument();
    expect(screen.queryByText(activeTodo.text)).not.toBeInTheDocument();
    expect(screen.getByText(expiredTodo1.text)).toBeInTheDocument();
    expect(screen.getByText(expiredTodo2.text)).toBeInTheDocument();
  });
});

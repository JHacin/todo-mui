import React from 'react';
import { createRandomTodo, render, screen } from '../../../test-utils';
import { initStore } from '../../../redux/store';
import { initialRootState } from '../../../redux';
import { TodoStatus } from '../../../types';
import { ActiveTodos } from './';

describe('ActiveTodos', () => {
  it('does not render anything if there are no active todos', async () => {
    render(<ActiveTodos />);
    const list = screen.queryByText(/upcoming/i);
    expect(list).not.toBeInTheDocument();
  });

  it('renders only active todos', () => {
    const activeTodo1 = createRandomTodo({ status: TodoStatus.Active, text: 'Text1' });
    const activeTodo2 = createRandomTodo({ status: TodoStatus.Active, text: 'Text2' });
    const completedTodo = createRandomTodo({ status: TodoStatus.Completed, text: 'Text3' });

    const store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: {
          order: [activeTodo1.id, activeTodo2.id, completedTodo.id],
          byId: {
            [activeTodo1.id]: activeTodo1,
            [activeTodo2.id]: activeTodo2,
            [completedTodo.id]: completedTodo,
          },
        },
      },
    });

    render(<ActiveTodos />, { store });

    expect(screen.getByText(/upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(activeTodo1.text)).toBeInTheDocument();
    expect(screen.getByText(activeTodo2.text)).toBeInTheDocument();
    expect(screen.queryByText(completedTodo.text)).not.toBeInTheDocument();
  });

  //Todo: DND test
});

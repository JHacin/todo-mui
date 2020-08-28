import React from 'react';
import { render, screen } from '../../../test-utils';
import { initStore } from '../../../redux/store';
import { initialRootState } from '../../../redux';
import { TodoStatus } from '../../../types';
import { CompletedTodos } from './';
import userEvent from '@testing-library/user-event';
import { createRandomTodo, generateMockTodoState } from '../../../test-utils/mock-generators';

describe('CompletedTodos', () => {
  it('does not render anything if there are no expired todos', async () => {
    render(<CompletedTodos />);
    const list = screen.queryByText(/completed/i);
    expect(list).not.toBeInTheDocument();
  });

  it('renders only completed todos', () => {
    const activeTodo = createRandomTodo({ status: TodoStatus.Active, text: 'Active' });
    const completedTodo1 = createRandomTodo({ status: TodoStatus.Completed, text: 'Text1' });
    const completedTodo2 = createRandomTodo({ status: TodoStatus.Completed, text: 'Text2' });

    const store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: generateMockTodoState([activeTodo, completedTodo1, completedTodo2]),
      },
    });

    render(<CompletedTodos />, { store });

    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.queryByText(activeTodo.text)).not.toBeInTheDocument();
    expect(screen.getByText(completedTodo1.text)).toBeInTheDocument();
    expect(screen.getByText(completedTodo2.text)).toBeInTheDocument();
  });

  it('supports uncompleting todos', () => {
    const todo = createRandomTodo({ status: TodoStatus.Completed });

    const store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: generateMockTodoState([todo]),
      },
    });

    expect(store.getState().todos.byId[todo.id].status).toEqual(TodoStatus.Completed);

    render(<CompletedTodos />, { store });

    userEvent.click(screen.getByRole('checkbox'));
    expect(store.getState().todos.byId[todo.id].status).toEqual(TodoStatus.Active);
  });
});

import { createRandomTodo, render } from '../../test-utils';
import { CronWrapper } from './index';
import React from 'react';
import { initStore } from '../../redux/store';
import { initialRootState } from '../../redux';
import dayjs from 'dayjs';
import { TodoStatus } from '../../types';

jest.useFakeTimers();

describe('CronWrapper', () => {
  it('updates expired todos', () => {
    const todo = createRandomTodo({
      dueDate: dayjs().subtract(1, 'week').format(),
      status: TodoStatus.Active,
    });

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

    render(<CronWrapper />, { store });
    expect(store.getState().todos.byId[todo.id].status).toEqual(todo.status);

    jest.advanceTimersByTime(1000 * 30);
    expect(store.getState().todos.byId[todo.id].status).toEqual(TodoStatus.Expired);
  });
});

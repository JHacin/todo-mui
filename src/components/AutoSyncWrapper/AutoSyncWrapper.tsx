import { render } from '../../test-utils';
import { AutoSyncWrapper } from './index';
import React from 'react';
import { initStore } from '../../redux/store';
import { initialRootState } from '../../redux';
import dayjs from 'dayjs';
import { TodoStatus } from '../../types';
import { createRandomTodo, generateMockTodoState } from '../../test-utils/mock-generators';

jest.useFakeTimers();

describe('AutoSyncWrapper', () => {
  it('updates expired todos', () => {
    const todo = createRandomTodo({
      dueDate: dayjs().subtract(1, 'week').format(),
      status: TodoStatus.Active,
    });

    const store = initStore({
      fallbackState: {
        ...initialRootState,
        todos: generateMockTodoState([todo]),
      },
    });

    render(<AutoSyncWrapper />, { store });
    expect(store.getState().todos.byId[todo.id].status).toEqual(todo.status);

    jest.advanceTimersByTime(1000 * 30);
    expect(store.getState().todos.byId[todo.id].status).toEqual(TodoStatus.Expired);
  });
});

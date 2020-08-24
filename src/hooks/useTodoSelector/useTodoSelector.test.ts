import * as reactRedux from 'react-redux';
import { RootState } from '../../redux/store';
import { createRandomTodo } from '../../test-utils';
import { TodoType } from '../../types';
import { renderHook } from '@testing-library/react-hooks';
import { useTodoSelector } from './index';
import { todosInitialState } from '../../redux/features/todos/todosSlice';

const spy = jest.spyOn(reactRedux, 'useSelector');

describe('useTodoSelector', () => {
  it('handles initial state', () => {
    const mockState: RootState = {
      todos: todosInitialState,
    };

    spy.mockImplementation((cb) => cb(mockState));

    const { result: activeTodos } = renderHook(() => useTodoSelector(TodoType.Active));
    expect(activeTodos.current.todos.length).toEqual(0);
  });

  it('correctly filters todos by type', () => {
    const mockState: RootState = {
      todos: {
        ids: ['1', '2', '3', '4'],
        byId: {
          '1': createRandomTodo(TodoType.Active),
          '2': createRandomTodo(TodoType.Completed),
          '3': createRandomTodo(TodoType.Active),
          '4': createRandomTodo(TodoType.Active),
        },
      },
    };

    spy.mockImplementation((cb) => cb(mockState));

    const { result: activeTodos } = renderHook(() => useTodoSelector(TodoType.Active));
    expect(activeTodos.current.todos.length).toEqual(3);

    const { result: completedTodos } = renderHook(() => useTodoSelector(TodoType.Completed));
    expect(completedTodos.current.todos.length).toEqual(1);

    const { result: expiredTodos } = renderHook(() => useTodoSelector(TodoType.Expired));
    expect(expiredTodos.current.todos.length).toEqual(0);

    spy.mockClear();
  });
});

import * as reactRedux from 'react-redux';
import { createRandomTodo } from '../../test-utils';
import { TodoType } from '../../types';
import { renderHook } from '@testing-library/react-hooks';
import { useTodoSelector } from './index';
import { initialRootState, RootState } from '../../redux';

const spy = jest.spyOn(reactRedux, 'useSelector');

describe('useTodoSelector', () => {
  it('handles initial state', () => {
    spy.mockImplementation((cb) => cb(initialRootState));

    const { result: activeTodos } = renderHook(() =>
      useTodoSelector((todo) => todo.type === TodoType.Active)
    );
    expect(activeTodos.current.selectedTodos.length).toEqual(0);
  });

  it('correctly filters todos by type', () => {
    const mockState: RootState = {
      ...initialRootState,
      todos: {
        order: ['1', '2', '3', '4'],
        byId: {
          '1': createRandomTodo({ type: TodoType.Active }),
          '2': createRandomTodo({ type: TodoType.Completed }),
          '3': createRandomTodo({ type: TodoType.Active }),
          '4': createRandomTodo({ type: TodoType.Active }),
        },
      },
    };

    spy.mockImplementation((cb) => cb(mockState));

    const { result: activeTodos } = renderHook(() =>
      useTodoSelector((todo) => todo.type === TodoType.Active)
    );
    expect(activeTodos.current.selectedTodos.length).toEqual(3);

    const { result: completedTodos } = renderHook(() =>
      useTodoSelector((todo) => todo.type === TodoType.Completed)
    );
    expect(completedTodos.current.selectedTodos.length).toEqual(1);

    const { result: expiredTodos } = renderHook(() =>
      useTodoSelector((todo) => todo.type === TodoType.Expired)
    );
    expect(expiredTodos.current.selectedTodos.length).toEqual(0);

    spy.mockClear();
  });

  it('handles search', () => {
    const mockState: RootState = {
      todos: {
        order: ['1', '2'],
        byId: {
          '1': createRandomTodo({ text: 'Lorem ipsum' }),
          '2': createRandomTodo({ text: 'Do the dishes' }),
        },
      },
      search: 'DIsH', // Ensure that the filtering is case-insensitive.
    };

    spy.mockImplementation((cb) => cb(mockState));

    const { result } = renderHook(() => useTodoSelector((todo) => todo.type === TodoType.Active));

    expect(result.current.selectedTodos.length).toEqual(1);
  });
});

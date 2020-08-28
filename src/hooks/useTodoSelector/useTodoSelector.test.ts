import * as reactRedux from 'react-redux';
import { TodoStatus } from '../../types';
import { renderHook } from '@testing-library/react-hooks';
import { useTodoSelector } from './index';
import { initialRootState, RootState } from '../../redux';
import { generateMockTodoState, generateMultipleRandomTodos } from '../../test-utils/mock-generators';

const spy = jest.spyOn(reactRedux, 'useSelector');

describe('useTodoSelector', () => {
  it('handles initial state', () => {
    spy.mockImplementation((cb) => cb(initialRootState));

    const { result: activeTodos } = renderHook(() =>
      useTodoSelector((todo) => todo.status === TodoStatus.Active)
    );
    expect(activeTodos.current.selectedTodos.length).toEqual(0);
  });

  it('correctly filters todos by status', () => {
    const todos = generateMultipleRandomTodos(4, [
      { status: TodoStatus.Active },
      { status: TodoStatus.Completed },
      { status: TodoStatus.Active },
      { status: TodoStatus.Active },
    ]);

    const mockState: RootState = {
      ...initialRootState,
      todos: generateMockTodoState(todos),
    };

    spy.mockImplementation((cb) => cb(mockState));

    const { result: active } = renderHook(() => useTodoSelector((todo) => todo.status === TodoStatus.Active));
    expect(active.current.selectedTodos.length).toEqual(3);

    const { result: completed } = renderHook(() =>
      useTodoSelector((todo) => todo.status === TodoStatus.Completed)
    );
    expect(completed.current.selectedTodos.length).toEqual(1);

    const { result: expired } = renderHook(() =>
      useTodoSelector((todo) => todo.status === TodoStatus.Expired)
    );
    expect(expired.current.selectedTodos.length).toEqual(0);

    spy.mockClear();
  });

  it('handles search', () => {
    const todos = generateMultipleRandomTodos(2, [{ text: 'Lorem ipsum' }, { text: 'Do the dishes' }]);

    const mockState: RootState = {
      todos: generateMockTodoState(todos),
      search: 'DIsH', // Ensure that the filtering is case-insensitive.
    };

    spy.mockImplementation((cb) => cb(mockState));

    const { result } = renderHook(() => useTodoSelector((todo) => todo.status === TodoStatus.Active));
    expect(result.current.selectedTodos.length).toEqual(1);
  });
});

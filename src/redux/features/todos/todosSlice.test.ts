import todosReducer, {
  addTodo,
  removeTodo,
  updateTodo,
  updateTodosOrder,
  updateAllTodos,
} from './todosSlice';
import { TodoStatus } from '../../../types';
import { AnyAction } from '@reduxjs/toolkit';
import { initialRootState, RootState } from '../../index';
import {
  createRandomTodo,
  generateMockTodoState,
  generateMultipleRandomTodos,
} from '../../../test-utils/mock-generators';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todosReducer(undefined, {} as AnyAction)).toEqual(initialRootState.todos);
  });

  it('should handle addTodo', () => {
    const newTodo = createRandomTodo();

    expect(
      todosReducer(initialRootState.todos, {
        type: addTodo.type,
        payload: newTodo,
      })
    ).toEqual<RootState['todos']>(generateMockTodoState([newTodo]));

    const existingTodo = createRandomTodo();

    expect(
      todosReducer(generateMockTodoState([existingTodo]), {
        type: addTodo.type,
        payload: newTodo,
      })
    ).toEqual<RootState['todos']>(generateMockTodoState([newTodo, existingTodo]));
  });

  it('should handle removeTodo', () => {
    const removedTodo = createRandomTodo();

    expect(
      todosReducer(generateMockTodoState([removedTodo]), {
        type: removeTodo.type,
        payload: removedTodo,
      })
    ).toEqual<RootState['todos']>(initialRootState.todos);

    const leftoverTodo = createRandomTodo();

    expect(
      todosReducer(generateMockTodoState([removedTodo, leftoverTodo]), {
        type: removeTodo.type,
        payload: removedTodo,
      })
    ).toEqual<RootState['todos']>(generateMockTodoState([leftoverTodo]));
  });

  it('should handle updateTodo', () => {
    const updatedTodo = createRandomTodo();
    const mockState = generateMockTodoState([updatedTodo]);

    expect(
      todosReducer(mockState, {
        type: updateTodo.type,
        payload: {
          ...updatedTodo,
          status: TodoStatus.Expired,
          text: 'I was changed.',
        },
      })
    ).toEqual<RootState['todos']>({
      ...mockState,
      byId: {
        [updatedTodo.id]: {
          ...mockState.byId[updatedTodo.id],
          status: TodoStatus.Expired,
          text: 'I was changed.',
        },
      },
    });

    const otherTodo = createRandomTodo();
    const mockState2 = generateMockTodoState([updatedTodo, otherTodo]);

    expect(
      todosReducer(mockState2, {
        type: updateTodo.type,
        payload: {
          ...updatedTodo,
          status: TodoStatus.Completed,
        },
      })
    ).toEqual<RootState['todos']>({
      ...mockState2,
      byId: {
        ...mockState2.byId,
        [updatedTodo.id]: {
          ...mockState2.byId[updatedTodo.id],
          status: TodoStatus.Completed,
        },
      },
    });
  });

  it('should handle updateTodosOrder', () => {
    const todos = generateMultipleRandomTodos(4);
    const initialState = generateMockTodoState(todos);

    expect(
      todosReducer(initialState, {
        type: updateTodosOrder.type,
        payload: [2, 3, 1, 1, 1, 3].map((index) => todos[index].id), // checking if only unique values are kept
      })
    ).toEqual<RootState['todos']>({
      order: [2, 3, 1].map((index) => todos[index].id),
      byId: initialState.byId,
    });
  });

  it('should handle updateAllTodos', () => {
    const todos = generateMultipleRandomTodos(4);
    const initialState = generateMockTodoState(todos);

    const updatedTodos = todos.map((todo) => ({ ...todo, text: 'I was changed.' }));
    const updatedInitialState = generateMockTodoState(updatedTodos);

    expect(todosReducer(initialState, { type: updateAllTodos.type, payload: updatedTodos })).toEqual<
      RootState['todos']
    >({
      ...initialState,
      byId: updatedInitialState.byId,
    });
  });
});

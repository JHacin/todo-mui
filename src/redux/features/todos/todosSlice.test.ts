import todosReducer, {
  addTodo,
  removeTodo,
  updateTodo,
  updateTodosOrder,
  updateAllTodos,
} from './todosSlice';
import { TodoStatus } from '../../../types';
import { AnyAction } from '@reduxjs/toolkit';
import { createRandomTodo } from '../../../test-utils';
import { initialRootState, RootState } from '../../index';

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
    ).toEqual<RootState['todos']>({
      order: [newTodo.id],
      byId: {
        [newTodo.id]: newTodo,
      },
    });

    const existingTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          order: [existingTodo.id],
          byId: {
            [existingTodo.id]: existingTodo,
          },
        },
        {
          type: addTodo.type,
          payload: newTodo,
        }
      )
    ).toEqual<RootState['todos']>({
      order: [newTodo.id, existingTodo.id],
      byId: {
        [existingTodo.id]: existingTodo,
        [newTodo.id]: newTodo,
      },
    });
  });

  it('should handle removeTodo', () => {
    const removedTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          order: [removedTodo.id],
          byId: { [removedTodo.id]: removedTodo },
        },
        {
          type: removeTodo.type,
          payload: removedTodo,
        }
      )
    ).toEqual<RootState['todos']>({
      order: [],
      byId: {},
    });

    const leftoverTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          order: [removedTodo.id, leftoverTodo.id],
          byId: {
            [removedTodo.id]: removedTodo,
            [leftoverTodo.id]: leftoverTodo,
          },
        },
        {
          type: removeTodo.type,
          payload: removedTodo,
        }
      )
    ).toEqual<RootState['todos']>({
      order: [leftoverTodo.id],
      byId: { [leftoverTodo.id]: leftoverTodo },
    });
  });

  it('should handle updateTodo', () => {
    const updatedTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          order: [updatedTodo.id],
          byId: { [updatedTodo.id]: updatedTodo },
        },
        {
          type: updateTodo.type,
          payload: {
            ...updatedTodo,
            status: TodoStatus.Expired,
            text: 'I was changed.',
          },
        }
      )
    ).toEqual<RootState['todos']>({
      order: [updatedTodo.id],
      byId: {
        [updatedTodo.id]: {
          ...updatedTodo,
          status: TodoStatus.Expired,
          text: 'I was changed.',
        },
      },
    });

    const otherTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          order: [updatedTodo.id, otherTodo.id],
          byId: {
            [updatedTodo.id]: updatedTodo,
            [otherTodo.id]: otherTodo,
          },
        },
        {
          type: updateTodo.type,
          payload: {
            ...updatedTodo,
            status: TodoStatus.Completed,
          },
        }
      )
    ).toEqual<RootState['todos']>({
      order: [updatedTodo.id, otherTodo.id],
      byId: {
        [updatedTodo.id]: {
          ...updatedTodo,
          status: TodoStatus.Completed,
        },
        [otherTodo.id]: otherTodo,
      },
    });
  });

  it('should handle updateTodosOrder', () => {
    const initialState: RootState['todos'] = {
      order: ['1', '2', '3'],
      byId: {
        '1': createRandomTodo(),
        '2': createRandomTodo(),
        '3': createRandomTodo(),
      },
    };

    expect(
      todosReducer(initialState, {
        type: updateTodosOrder.type,
        payload: ['2', '3', '1', '1', '1', '2', '3'], // checking if only unique values are kept
      })
    ).toEqual<RootState['todos']>({
      order: ['2', '3', '1'],
      byId: initialState.byId,
    });
  });

  it('should handle updateAllTodos', () => {
    const todos = [...Array(4)].map((_) => createRandomTodo());
    const initialState: RootState['todos'] = {
      order: todos.map((todo) => todo.id),
      byId: {},
    };
    todos.forEach((todo) => {
      initialState.byId[todo.id] = todo
    });

    const updatedTodos = todos.map((todo) => ({ ...todo, text: 'I was changed.' }));
    const updatedState: RootState['todos'] = {
      ...initialState,
      byId: {},
    };
    updatedTodos.forEach((todo) => {
      updatedState.byId[todo.id] = todo
    });

    expect(todosReducer(initialState, { type: updateAllTodos.type, payload: updatedTodos })).toEqual<
      RootState['todos']
    >({
      ...initialState,
      byId: updatedState.byId,
    });
  });
});

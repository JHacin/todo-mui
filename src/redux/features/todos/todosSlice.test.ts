import todosReducer, { addTodo, removeTodo, updateTodo } from './todosSlice';
import { TodoType } from '../../../types';
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
            type: TodoType.Expired,
            text: 'I was changed.',
          },
        }
      )
    ).toEqual<RootState['todos']>({
      order: [updatedTodo.id],
      byId: {
        [updatedTodo.id]: {
          ...updatedTodo,
          type: TodoType.Expired,
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
            type: TodoType.Completed,
          },
        }
      )
    ).toEqual<RootState['todos']>({
      order: [updatedTodo.id, otherTodo.id],
      byId: {
        [updatedTodo.id]: {
          ...updatedTodo,
          type: TodoType.Completed,
        },
        [otherTodo.id]: otherTodo,
      },
    });
  });
});

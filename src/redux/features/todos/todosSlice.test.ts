import todosReducer, { addTodo, todosInitialState, removeTodo, updateTodo } from './todosSlice';
import { TodoType } from '../../../types';
import { AnyAction } from '@reduxjs/toolkit';
import { createRandomTodo } from '../../../test-utils';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todosReducer(undefined, {} as AnyAction)).toEqual(todosInitialState);
  });

  it('should handle addTodo', () => {
    const newTodo = createRandomTodo();

    expect(
      todosReducer(todosInitialState, {
        type: addTodo.type,
        payload: newTodo,
      })
    ).toEqual({
      ids: [newTodo.id],
      byId: {
        [newTodo.id]: newTodo,
      },
    });

    const existingTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          ids: [existingTodo.id],
          byId: {
            [existingTodo.id]: existingTodo,
          },
        },
        {
          type: addTodo.type,
          payload: newTodo,
        }
      )
    ).toEqual({
      ids: [newTodo.id, existingTodo.id],
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
          ids: [removedTodo.id],
          byId: { [removedTodo.id]: removedTodo },
        },
        {
          type: removeTodo.type,
          payload: { id: removedTodo.id },
        }
      )
    ).toEqual({
      ids: [],
      byId: {},
    });

    const leftoverTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          ids: [removedTodo.id, leftoverTodo.id],
          byId: {
            [removedTodo.id]: removedTodo,
            [leftoverTodo.id]: leftoverTodo,
          },
        },
        {
          type: removeTodo.type,
          payload: { id: removedTodo.id },
        }
      )
    ).toEqual({
      ids: [leftoverTodo.id],
      byId: { [leftoverTodo.id]: leftoverTodo },
    });
  });

  it('should handle updateTodo', () => {
    const updatedTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          ids: [updatedTodo.id],
          byId: { [updatedTodo.id]: updatedTodo },
        },
        {
          type: updateTodo.type,
          payload: {
            todo: {
              ...updatedTodo,
              type: TodoType.Expired,
              text: 'I was changed.',
            },
          },
        }
      )
    ).toEqual({
      ids: [updatedTodo.id],
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
          ids: [updatedTodo.id, otherTodo.id],
          byId: {
            [updatedTodo.id]: updatedTodo,
            [otherTodo.id]: otherTodo,
          },
        },
        {
          type: updateTodo.type,
          payload: {
            todo: {
              ...updatedTodo,
              type: TodoType.Completed,
            },
          },
        }
      )
    ).toEqual({
      ids: [updatedTodo.id, otherTodo.id],
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

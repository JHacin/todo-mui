import todosReducer, { addTodo, markTodoAsCompleted, removeTodo, todosSliceInitialState } from './todosSlice';
import { v4 as uuid } from 'uuid';
import { Todo, TodoType } from '../../../types';
import dayjs from 'dayjs';
import { AnyAction } from '@reduxjs/toolkit';

const createRandomTodo = (type: TodoType = TodoType.Active): Todo => {
  return {
    id: uuid(),
    type,
    text: 'Random todo',
    dueDate: dayjs()
      .add(Math.floor(Math.random() * 366), 'day')
      .format(),
  };
};

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todosReducer(undefined, {} as AnyAction)).toEqual(todosSliceInitialState);
  });

  it('should handle addTodo', () => {
    const newTodo = createRandomTodo();

    expect(
      todosReducer(todosSliceInitialState, {
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

  it('should handle markTodoAsCompleted', () => {
    const updatedTodo = createRandomTodo();

    expect(
      todosReducer(
        {
          ids: [updatedTodo.id],
          byId: { [updatedTodo.id]: updatedTodo },
        },
        {
          type: markTodoAsCompleted.type,
          payload: { id: updatedTodo.id },
        }
      )
    ).toEqual({
      ids: [updatedTodo.id],
      byId: { [updatedTodo.id]: { ...updatedTodo, type: TodoType.Completed } },
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
          type: markTodoAsCompleted.type,
          payload: { id: updatedTodo.id },
        }
      )
    ).toEqual({
      ids: [updatedTodo.id, otherTodo.id],
      byId: {
        [updatedTodo.id]: { ...updatedTodo, type: TodoType.Completed },
        [otherTodo.id]: otherTodo,
      },
    });
  });
});

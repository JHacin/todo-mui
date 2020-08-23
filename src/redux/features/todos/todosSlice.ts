import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Todo, TodoType } from '../../../types';
import { RootState } from '../../store';

export const todosSliceInitialState: RootState['todos'] = {
  ids: [],
  byId: {},
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosSliceInitialState,
  // It looks like we are mutating the state directly, however Redux toolkit uses Immer
  // internally to ensure that createSlice reducers will always return an immutably updated result.
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.ids = [action.payload.id, ...state.ids];
        state.byId[action.payload.id] = action.payload;
      },
      prepare(payload: Omit<Todo, 'id' | 'type'>) {
        return {
          payload: {
            id: uuid(),
            type: TodoType.Active,
            ...payload,
          },
        };
      },
    },
    removeTodo(state, action: PayloadAction<{ id: Todo['id'] }>) {
      state.ids = state.ids.filter((todoId) => todoId !== action.payload.id);
      delete state.byId[action.payload.id];
    },
    markTodoAsCompleted(state, action: PayloadAction<{ id: Todo['id'] }>) {
      const todo = state.byId[action.payload.id];
      if (todo) {
        todo.type = TodoType.Completed;
      }
    },
  },
});

export const { addTodo, removeTodo, markTodoAsCompleted } = todosSlice.actions;

export default todosSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Todo, TodoType } from '../../../types';
import { RootState } from '../../store';

export const todosInitialState: RootState['todos'] = {
  ids: [],
  byId: {},
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  // It looks like we are mutating the state directly, however Redux toolkit uses Immer
  // internally to ensure that createSlice reducers will always return an immutably updated result.
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<{ todo: Todo }>) {
        state.ids = [action.payload.todo.id, ...state.ids];
        state.byId[action.payload.todo.id] = action.payload.todo;
      },
      prepare(payload: { todo: Omit<Todo, 'id' | 'type'> }) {
        return {
          payload: {
            todo: {
              id: uuid(),
              type: TodoType.Active,
              ...payload.todo,
            },
          },
        };
      },
    },
    removeTodo(state, action: PayloadAction<{ id: Todo['id'] }>) {
      state.ids = state.ids.filter((todoId) => todoId !== action.payload.id);
      delete state.byId[action.payload.id];
    },
    updateTodo(state, action: PayloadAction<{ todo: Todo }>) {
      state.byId[action.payload.todo.id] = action.payload.todo;
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;

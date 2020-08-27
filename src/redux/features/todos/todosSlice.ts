import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Todo, TodoStatus } from '../../../types';
import { initialRootState } from '../../index';
import { isDueDateExpired } from '../../../util';

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialRootState.todos,
  // It looks like we are mutating the state directly, however Redux toolkit uses Immer
  // internally to ensure that createSlice reducers will always return an immutably updated result.
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.order = [action.payload.id, ...state.order];
        state.byId[action.payload.id] = action.payload;
      },
      prepare(payload: Omit<Todo, 'id' | 'status'>) {
        return {
          payload: {
            id: uuid(),
            status: isDueDateExpired(payload.dueDate) ? TodoStatus.Expired : TodoStatus.Active,
            ...payload,
          },
        };
      },
    },
    removeTodo(state, action: PayloadAction<Todo>) {
      state.order = state.order.filter((id) => id !== action.payload.id);
      delete state.byId[action.payload.id];
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      state.byId[action.payload.id] = action.payload;
    },
    updateTodosOrder(state, action: PayloadAction<Todo['id'][]>) {
      state.order = [...new Set([...action.payload, ...state.order])]; // We remove any duplicates.
    },
    updateAllTodos(state, action: PayloadAction<Todo[]>) {
      action.payload.forEach((todo) => (state.byId[todo.id] = todo));
    },
  },
});

export const { addTodo, removeTodo, updateTodo, updateTodosOrder, updateAllTodos } = todosSlice.actions;

export default todosSlice.reducer;

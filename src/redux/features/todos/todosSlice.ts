import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Todo, TodoType } from '../../../types';
import { RootState } from '../../store';

export const todosInitialState: RootState['todos'] = {
  order: [],
  byId: {},
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  // It looks like we are mutating the state directly, however Redux toolkit uses Immer
  // internally to ensure that createSlice reducers will always return an immutably updated result.
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.order = [action.payload.id, ...state.order];
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
    removeTodo(state, action: PayloadAction<Todo>) {
      state.order = state.order.filter((id) => id !== action.payload.id);
      delete state.byId[action.payload.id];
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      state.byId[action.payload.id] = action.payload;
    },
    updateTodosOrder(state, action: PayloadAction<RootState['todos']['order']>) {
      state.order = action.payload;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, updateTodosOrder } = todosSlice.actions;

export default todosSlice.reducer;

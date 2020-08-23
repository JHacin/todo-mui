import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from './features/todos/todosSlice';
import { Todo } from '../types';

export interface RootState {
  todos: {
    ids: Todo['id'][];
    byId: Record<Todo['id'], Todo>;
  };
}

const initialState: RootState = {
  todos: {
    ids: [],
    byId: {},
  },
};

const persistedState = localStorage.getItem('state');

const store = configureStore({
  reducer: combineReducers({
    todos: todosReducer,
  }),
  preloadedState: persistedState ? JSON.parse(persistedState) : initialState,
});

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export { store };

import { configureStore, combineReducers, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from '../features/todos/todosSlice';
import { Todo } from '../../types';

export interface RootState {
  todos: {
    ids: Todo['id'][];
    byId: Record<Todo['id'], Todo>;
  };
}

export const LOCAL_STORAGE_PERSISTED_STATE_KEY = 'state';

export const initStore = ({
  fallbackState = {},
  options,
}: {
  fallbackState?: ConfigureStoreOptions<RootState>['preloadedState'];
  options?: ConfigureStoreOptions<RootState>;
} = {}) => {
  const persistedState = localStorage.getItem(LOCAL_STORAGE_PERSISTED_STATE_KEY);

  const store = configureStore({
    reducer: combineReducers({
      todos: todosReducer,
    }),
    preloadedState: persistedState ? JSON.parse(persistedState) : fallbackState,
    ...options,
  });

  store.subscribe(() => {
    localStorage.setItem(LOCAL_STORAGE_PERSISTED_STATE_KEY, JSON.stringify(store.getState()));
  });

  return store;
};

export const store = initStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

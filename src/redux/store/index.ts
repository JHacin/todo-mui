import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todosReducer from '../features/todos/todosSlice';
import searchReducer from '../features/search/searchSlice';
import { RootState } from '../index';

export const PERSISTED_STATE_KEY = 'state';

export const persistState = (state: ConfigureStoreOptions<RootState>['preloadedState']) => {
  localStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(state));
};

export const getPersistedState = (): ConfigureStoreOptions<RootState>['preloadedState'] | null => {
  const persistedState = localStorage.getItem(PERSISTED_STATE_KEY);
  return persistedState ? JSON.parse(persistedState) : null;
};

export const initStore = ({
  fallbackState = {},
  options,
}: {
  fallbackState?: ConfigureStoreOptions<RootState>['preloadedState'];
  options?: ConfigureStoreOptions<RootState>;
} = {}) => {
  const persistedState = getPersistedState();

  const store = configureStore({
    reducer: combineReducers({
      todos: todosReducer,
      search: searchReducer,
    }),
    preloadedState: persistedState || fallbackState,
    ...options,
  });

  store.subscribe(() => {
    persistState(store.getState());
  });

  return store;
};

export const store = initStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import { Todo } from '../types';

export interface RootState {
  todos: {
    order: Todo['id'][];
    byId: Record<Todo['id'], Todo>;
  };
  search: string;
}

export const initialRootState: RootState = {
  todos: {
    order: [],
    byId: {},
  },
  search: '',
};

import { TodoType } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const useTodoSelector = (type: TodoType) => {
  const todos = useSelector((state: RootState) => {
    return state.todos.ids
      .filter((todoId) => state.todos.byId[todoId].type === type)
      .map((todoId) => state.todos.byId[todoId]);
  });

  return { todos };
};

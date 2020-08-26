import { Todo } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

export const useTodoSelector = (filterCb: (todo: Todo) => boolean) => {
  const { order, byId } = useSelector((state: RootState) => state.todos);

  const allTodos = order.map((id) => byId[id]);
  const selectedTodos = allTodos.filter(filterCb);

  return { order, byId, allTodos, selectedTodos };
};

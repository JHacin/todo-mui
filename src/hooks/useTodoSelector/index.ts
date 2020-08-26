import { Todo } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

export const useTodoSelector = (filterCb: (todo: Todo) => boolean) => {
  const { order, byId } = useSelector((state: RootState) => state.todos);
  const search = useSelector((state: RootState) => state.search);

  const filterBySearch = (todo: Todo) => {
    return todo.text.toLowerCase().includes(search.toLowerCase());
  };

  const allTodos = order.map((id) => byId[id]);
  const selectedTodos = allTodos.filter(filterCb).filter(filterBySearch);

  return { order, byId, allTodos, selectedTodos };
};

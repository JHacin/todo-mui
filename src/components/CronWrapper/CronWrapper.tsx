import React, { FC } from 'react';
import { useTodoSelector } from '../../hooks/useTodoSelector';
import { TodoStatus } from '../../types';
import { isDueDateExpired } from '../../util';
import { useAppDispatch } from '../../redux/store';
import { updateAllTodos } from '../../redux/features/todos/todosSlice';
import { useInterval } from '../../hooks/useInterval';

export const CronWrapper: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { selectedTodos: activeTodos } = useTodoSelector((todo) => todo.status === TodoStatus.Active);

  const refreshTodos = (): void => {
    const result = activeTodos.map((todo) => ({
      ...todo,
      status: isDueDateExpired(todo.dueDate) ? TodoStatus.Expired : todo.status,
    }));

    dispatch(updateAllTodos(result));
  };

  useInterval(refreshTodos, 1000 * 60);

  return <>{children}</>;
};

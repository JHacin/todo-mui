import React, { FC } from 'react';
import { useTodoSelector } from '../../hooks/useTodoSelector';
import { TodoStatus } from '../../types';
import { isDueDateExpired } from '../../util';
import { useAppDispatch } from '../../redux/store';
import { updateAllTodos } from '../../redux/features/todos/todosSlice';
import { useInterval } from '../../hooks/useInterval';
import { useSnackbar } from 'notistack';

export const AutoSyncWrapper: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { selectedTodos: activeTodos } = useTodoSelector((todo) => todo.status === TodoStatus.Active);

  const refreshTodos = (): void => {
    let numExpired = 0;

    const result = activeTodos.map((todo) => {
      const updated = { ...todo };

      if (todo.status !== TodoStatus.Expired && isDueDateExpired(todo.dueDate)) {
        numExpired++;
        updated.status = TodoStatus.Expired;
      }

      return updated;
    });

    dispatch(updateAllTodos(result));

    if (numExpired > 0) {
      enqueueSnackbar(
        `${numExpired} task${numExpired > 1 ? 's' : ''} ${numExpired > 1 ? 'have' : 'has'} become overdue.`,
        { variant: 'warning' }
      );
    }
  };

  useInterval(refreshTodos, 1000 * 30);

  return <>{children}</>;
};

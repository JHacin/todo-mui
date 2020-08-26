import React, { FC, useState } from 'react';
import { Todo, TodoType } from '../../types';
import { Checkbox, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteTodoButton } from '../DeleteTodoButton';
import { updateTodo } from '../../redux/features/todos/todosSlice';
import { useAppDispatch } from '../../redux/store';
import dayjs from 'dayjs';
import { useInterval } from '../../hooks/useInterval';
import { RemainingTimeLabel } from '../RemainingTimeLabel';

const getRemainingTime = ({ dueDate }: Todo): number => {
  return dayjs(dueDate).diff(dayjs());
};

export const ActiveTodosItem: FC<{ todo: Todo }> = ({ todo }) => {
  const refreshRemainingTime = (): void => {
    const remainingTime = getRemainingTime(todo);
    const isExpired = remainingTime <= 0;

    if (isExpired) {
      dispatch(updateTodo({ ...todo, type: TodoType.Expired }));
    } else {
      setRemainingTime(remainingTime);
    }
  };

  const dispatch = useAppDispatch();
  const [remainingTime, setRemainingTime] = useState<number>(getRemainingTime(todo));
  useInterval(refreshRemainingTime, 1000 * 60);

  const onMarkAsCompletedHandler = (): void => {
    dispatch(updateTodo({ ...todo, type: TodoType.Completed }));
  };

  return (
    <ListItem key={todo.id}>
      <ListItemIcon>
        <Checkbox edge="start" onClick={onMarkAsCompletedHandler} />
      </ListItemIcon>
      <ListItemText
        primary={todo.text}
        secondary={<RemainingTimeLabel remainingTime={remainingTime} />}
        secondaryTypographyProps={{ component: 'div' }}
      />
      <ListItemSecondaryAction>
        <DeleteTodoButton todo={todo} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

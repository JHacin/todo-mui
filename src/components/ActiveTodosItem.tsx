import React, { FC, useState } from 'react';
import { Todo, TodoType } from '../types';
import { Checkbox, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteTodoButton } from './DeleteTodoButton';
import { updateTodo } from '../redux/features/todos/todosSlice';
import { useAppDispatch } from '../redux/store';
import dayjs from 'dayjs';
import humanizeDuration from 'humanize-duration';
import { useInterval } from '../hooks/useInterval';

const getRemainingTime = ({ dueDate }: Todo): number => {
  return dayjs(dueDate).diff(dayjs());
};

const getReadableDuration = (ms: number) => {
  return humanizeDuration(ms, {
    largest: 2,
    delimiter: ' and ',
    units: ['y', 'mo', 'd', 'h', 'm'],
    round: true,
  });
};

const getRemainingTimeLabel = (todo: Todo): string => {
  const dateDiff = getRemainingTime(todo);
  return dateDiff <= 0 ? 'This item has expired.' : getReadableDuration(dateDiff);
};

export const ActiveTodosItem: FC<{ todo: Todo }> = ({ todo }) => {
  const refreshRemainingTime = (): void => {
    const remainingTime = getRemainingTime(todo);

    if (remainingTime <= 0) {
      dispatch(
        updateTodo({
          todo: { ...todo, type: TodoType.Expired },
        })
      );
      return;
    }

    setRemainingTimeLabel(getRemainingTimeLabel(todo));
  };

  const dispatch = useAppDispatch();
  const [remainingTimeLabel, setRemainingTimeLabel] = useState(getRemainingTimeLabel(todo));
  useInterval(refreshRemainingTime, 1000 * 60);

  const onMarkAsCompletedHandler = (): void => {
    dispatch(
      updateTodo({
        todo: { ...todo, type: TodoType.Completed },
      })
    );
  };

  return (
    <ListItem key={todo.id}>
      <ListItemIcon>
        <Checkbox edge="start" onClick={onMarkAsCompletedHandler} />
      </ListItemIcon>
      <ListItemText primary={todo.text} secondary={remainingTimeLabel} />
      <ListItemSecondaryAction>
        <DeleteTodoButton todo={todo} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

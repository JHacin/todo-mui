import React, { FC } from 'react';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from '@material-ui/core';
import { markTodoAsCompleted, removeTodo } from '../redux/features/todos/todosSlice';
import { Todo, TodoType } from '../types';
import DeleteIcon from '@material-ui/icons/Delete';
import humanizeDuration from 'humanize-duration';
import dayjs from 'dayjs';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { useAppDispatch } from '../redux/store';

export const ActiveTodos: FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useTodoSelector(TodoType.Active);

  const onMarkAsCompletedHandler = ({ id }: Todo): void => {
    dispatch(markTodoAsCompleted({ id }));
  };

  const onRemoveHandler = ({ id }: Todo): void => {
    dispatch(removeTodo({ id }));
  };

  const getRemainingTime = ({ dueDate }: Todo): string => {
    const dateDiff = dayjs(dueDate).diff(dayjs());
    return humanizeDuration(dateDiff, { largest: 2 });
  };

  return (
    <Paper>
      Active todos
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox edge="start" onClick={() => onMarkAsCompletedHandler(todo)} />
            </ListItemIcon>
            <ListItemText primary={todo.text} secondary={getRemainingTime(todo)} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => onRemoveHandler(todo)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

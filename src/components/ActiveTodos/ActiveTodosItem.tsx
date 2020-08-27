import React, { FC, useState } from 'react';
import { Todo, TodoStatus } from '../../types';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { DeleteTodoButton } from '../DeleteTodoButton';
import { updateTodo } from '../../redux/features/todos/todosSlice';
import { useAppDispatch } from '../../redux/store';
import { RemainingTimeLabel } from '../RemainingTimeLabel';
import EditIcon from '@material-ui/icons/Edit';
import { ActiveTodosItemEditForm } from './ActiveTodosItemEditForm';

export const ActiveTodosItem: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  const onEditButtonClickHandler = (): void => {
    setIsInEditMode(!isInEditMode);
  };

  const onEditSubmitHandler = (todo: Todo): void => {
    dispatch(updateTodo(todo));
    setIsInEditMode(false);
  };

  const onMarkAsCompletedHandler = (): void => {
    dispatch(updateTodo({ ...todo, status: TodoStatus.Completed }));
  };

  return (
    <ListItem key={todo.id}>
      <ListItemIcon>
        <Checkbox edge="start" onClick={onMarkAsCompletedHandler} />
      </ListItemIcon>
      {isInEditMode ? (
        <ActiveTodosItemEditForm todo={todo} onSubmit={onEditSubmitHandler} />
      ) : (
        <ListItemText
          primary={todo.text}
          secondary={<RemainingTimeLabel dueDate={todo.dueDate} />}
          secondaryTypographyProps={{ component: 'div' }}
        />
      )}
      <ListItemSecondaryAction>
        <IconButton onClick={onEditButtonClickHandler}>
          <EditIcon color="action" />
        </IconButton>
        <DeleteTodoButton todo={todo} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

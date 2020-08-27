import React, { FC } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { Todo } from '../types';
import { removeTodo } from '../redux/features/todos/todosSlice';
import { useAppDispatch } from '../redux/store';
import { useSnackbar } from 'notistack';

export const DeleteTodoButton: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onDeleteHandler = (): void => {
    dispatch(removeTodo(todo));
    enqueueSnackbar('Task successfully deleted.', { variant: 'success' });
  };

  return (
    <IconButton edge="end" onClick={onDeleteHandler}>
      <DeleteIcon color="action" />
    </IconButton>
  );
};

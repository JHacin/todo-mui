import React, { FC } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { Todo } from '../types';
import { removeTodo } from '../redux/features/todos/todosSlice';
import { useAppDispatch } from '../redux/store';

export const DeleteTodoButton: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const onRemoveHandler = ({ id }: Todo): void => {
    dispatch(removeTodo({ id }));
  };

  return (
    <IconButton edge="end" onClick={() => onRemoveHandler(todo)}>
      <DeleteIcon />
    </IconButton>
  );
};
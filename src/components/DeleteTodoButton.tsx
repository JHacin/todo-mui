import React, { FC } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { Todo } from '../types';
import { removeTodo } from '../redux/features/todos/todosSlice';
import { useAppDispatch } from '../redux/store';

export const DeleteTodoButton: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const onDeleteHandler = (): void => {
    dispatch(removeTodo(todo));
  };

  return (
    <IconButton edge="end" onClick={onDeleteHandler}>
      <DeleteIcon />
    </IconButton>
  );
};

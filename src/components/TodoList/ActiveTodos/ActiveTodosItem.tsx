import React, { FC, useState } from 'react';
import { Todo, TodoStatus } from '../../../types';
import {
  Checkbox,
  Hidden,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { DeleteTodoButton } from '../DeleteTodoButton';
import { updateTodo } from '../../../redux/features/todos/todosSlice';
import { useAppDispatch } from '../../../redux/store';
import { RemainingTimeLabel } from './RemainingTimeLabel';
import EditIcon from '@material-ui/icons/Edit';
import { EditTodoForm } from './EditTodoForm';
import { useSnackbar } from 'notistack';

const congratulatoryMessages: string[] = [
  'Way to go!',
  'Yay!',
  'Awesome!',
  'Well done!',
  'You did it!',
  'Bravo!',
  'Hooray!',
  '🥳',
];

const getRandomCompliment = (): string => {
  return congratulatoryMessages[Math.round(Math.random() * congratulatoryMessages.length)];
};

export const ActiveTodosItem: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
    enqueueSnackbar(getRandomCompliment(), { variant: 'success' });
  };

  return (
    <ListItem key={todo.id}>
      <ListItemIcon>
        <Checkbox edge="start" onClick={onMarkAsCompletedHandler} size="small" />
      </ListItemIcon>
      {isInEditMode ? (
        <EditTodoForm todo={todo} onEditSubmit={onEditSubmitHandler} />
      ) : (
        <ListItemText
          primary={todo.text}
          secondary={<RemainingTimeLabel dueDate={todo.dueDate} />}
          secondaryTypographyProps={{ component: 'div' }}
        />
      )}
      <ListItemSecondaryAction>
        <Hidden xsDown>
          <IconButton onClick={onEditButtonClickHandler}>
            <EditIcon color="action" fontSize="small" />
          </IconButton>
        </Hidden>
        <DeleteTodoButton todo={todo} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

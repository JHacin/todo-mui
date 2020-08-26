import React, { FC } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { TodoType } from '../types';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { DeleteTodoButton } from './DeleteTodoButton';
import { TodoListWrapper } from './TodoListWrapper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  primaryText: {
    textDecoration: 'line-through',
  },
});

export const CompletedTodos: FC = () => {
  const classes = useStyles();
  const { selectedTodos } = useTodoSelector((todo) => todo.type === TodoType.Completed);

  if (!selectedTodos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Completed">
      <List dense>
        {selectedTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox edge="start" checked disabled />
            </ListItemIcon>
            <ListItemText
              primary={todo.text}
              classes={{
                primary: classes.primaryText,
              }}
            />
            <ListItemSecondaryAction>
              <DeleteTodoButton todo={todo} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </TodoListWrapper>
  );
};

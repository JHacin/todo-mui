import React, { FC } from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { TodoType } from '../types';
import { DeleteTodoButton } from './DeleteTodoButton';

export const ExpiredTodos: FC = () => {
  const { todos } = useTodoSelector(TodoType.Expired);

  return (
    <Paper>
      Expired todos
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <DeleteTodoButton todo={todo} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

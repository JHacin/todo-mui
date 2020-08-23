import React, { FC } from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import { TodoType } from '../types';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { DeleteTodoButton } from './DeleteTodoButton';

export const CompletedTodos: FC = () => {
  const { todos } = useTodoSelector(TodoType.Completed);

  return (
    <Paper>
      Completed todos
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

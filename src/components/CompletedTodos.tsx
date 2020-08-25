import React, { FC } from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { TodoType } from '../types';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { DeleteTodoButton } from './DeleteTodoButton';
import { TodoListWrapper } from './TodoListWrapper';

export const CompletedTodos: FC = () => {
  const { todos } = useTodoSelector(TodoType.Completed);

  if (!todos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Completed">
      <List dense>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <DeleteTodoButton todo={todo} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </TodoListWrapper>
  );
};

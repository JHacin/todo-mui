import React, { FC } from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { TodoType } from '../types';
import { DeleteTodoButton } from './DeleteTodoButton';
import { TodoListWrapper } from './TodoListWrapper';

export const ExpiredTodos: FC = () => {
  const { todos } = useTodoSelector(TodoType.Expired);

  if (!todos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Overdue">
      <List dense>
        {todos.map((todo) => (
          <ListItem key={todo.id} disabled>
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

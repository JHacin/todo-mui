import React, { FC } from 'react';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { TodoType } from '../types';
import { DeleteTodoButton } from './DeleteTodoButton';
import { TodoListWrapper } from './TodoListWrapper';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

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
            <ListItemIcon>
              <SentimentVeryDissatisfiedIcon />
            </ListItemIcon>
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

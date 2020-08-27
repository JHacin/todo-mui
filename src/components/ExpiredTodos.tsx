import React, { FC } from 'react';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { TodoStatus } from '../types';
import { DeleteTodoButton } from './DeleteTodoButton';
import { TodoListWrapper } from './TodoListWrapper';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export const ExpiredTodos: FC = () => {
  const { selectedTodos } = useTodoSelector((todo) => todo.status === TodoStatus.Expired);

  if (!selectedTodos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Overdue">
      <List>
        {selectedTodos.map((todo) => (
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

import React, { FC } from 'react';
import { List, Paper } from '@material-ui/core';
import { TodoType } from '../types';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { ActiveTodosItem } from './ActiveTodosItem';

export const ActiveTodos: FC = () => {
  const { todos } = useTodoSelector(TodoType.Active);

  return (
    <Paper>
      Active todos
      <List>
        {todos.map((todo) => (
          <ActiveTodosItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Paper>
  );
};

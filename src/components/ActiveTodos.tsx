import React, { FC } from 'react';
import { List } from '@material-ui/core';
import { TodoType } from '../types';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { ActiveTodosItem } from './ActiveTodosItem';
import { TodoListWrapper } from './TodoListWrapper';

export const ActiveTodos: FC = () => {
  const { todos } = useTodoSelector(TodoType.Active);

  if (!todos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Upcoming">
      <List dense>
        {todos.map((todo) => (
          <ActiveTodosItem key={todo.id} todo={todo} />
        ))}
      </List>
    </TodoListWrapper>
  );
};

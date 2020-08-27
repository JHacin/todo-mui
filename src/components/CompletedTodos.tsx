import React, { FC } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Todo, TodoStatus } from '../types';
import { useTodoSelector } from '../hooks/useTodoSelector';
import { DeleteTodoButton } from './DeleteTodoButton';
import { TodoListWrapper } from './TodoListWrapper';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../redux/store';
import { updateTodo, updateTodosOrder } from '../redux/features/todos/todosSlice';

const useStyles = makeStyles({
  primaryText: {
    textDecoration: 'line-through',
  },
});

export const CompletedTodos: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { selectedTodos, order: originalOrder } = useTodoSelector(
    (todo) => todo.status === TodoStatus.Completed
  );

  const onUncompleteClickHandler = (todo: Todo): void => {
    dispatch(updateTodo({ ...todo, status: TodoStatus.Active }));
    dispatch(updateTodosOrder([todo.id, ...originalOrder]));
  };

  if (!selectedTodos.length) {
    return null;
  }

  return (
    <TodoListWrapper title="Completed">
      <List dense>
        {selectedTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked
                color="primary"
                onClick={() => onUncompleteClickHandler(todo)}
                size="small"
              />
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

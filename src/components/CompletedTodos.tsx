import React, { FC } from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';

export const CompletedTodos: FC = () => {
  const mock = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' },
    { id: 3, text: 'Todo 3' },
    { id: 4, text: 'Todo 4' },
  ];

  return (
    <Paper>
      Completed todos
      <List>
        {mock.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`Completed ${item.text}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

import React, { FC } from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';

export const ActiveTodos: FC = () => {
  const mock = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' },
    { id: 3, text: 'Todo 3' },
    { id: 4, text: 'Todo 4' },
  ];

  return (
    <Paper>
      Active todos
      <List>
        {mock.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`Active ${item.text}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

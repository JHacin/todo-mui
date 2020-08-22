import React, { FC } from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';

export const ExpiredTodos: FC = () => {
  const mock = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' },
    { id: 3, text: 'Todo 3' },
    { id: 4, text: 'Todo 4' },
  ];

  return (
    <Paper>
      Expired todos
      <List>
        {mock.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`Expired ${item.text}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

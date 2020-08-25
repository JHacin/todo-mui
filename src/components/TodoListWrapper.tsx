import React, { FC, ReactNode } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

export const TodoListWrapper: FC<{ title: ReactNode }> = ({ title, children }) => {
  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">{title}</Typography>
        {children}
      </Box>
    </Paper>
  );
};

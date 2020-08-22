import React, { FC } from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

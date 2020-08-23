import React, { FC } from 'react';
import { AppBar, Container, CssBaseline, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import { AddTodoInput } from './components/AddTodoInput';
import { ActiveTodos } from './components/ActiveTodos';
import { ExpiredTodos } from './components/ExpiredTodos';
import { CompletedTodos } from './components/CompletedTodos';

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Todo App</Typography>
          <TextField placeholder="Search..." />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AddTodoInput />
          </Grid>
          <Grid item xs={12}>
            <ActiveTodos />
          </Grid>
          <Grid item xs={12}>
            <CompletedTodos />
          </Grid>
          <Grid item xs={12}>
            <ExpiredTodos />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

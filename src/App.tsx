import React, { FC } from 'react';
import { Box, Container, CssBaseline, Grid } from '@material-ui/core';
import { AddTodoForm } from './components/AddTodoForm';
import { ActiveTodos } from './components/ActiveTodos';
import { ExpiredTodos } from './components/ExpiredTodos';
import { CompletedTodos } from './components/CompletedTodos';
import { AppHeader } from './components/AppHeader';

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth="md">
        <Box my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AddTodoForm />
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
        </Box>
      </Container>
    </>
  );
};

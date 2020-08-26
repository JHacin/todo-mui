import React, { FC } from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import { SearchInput } from './SearchInput';

export const AppHeader: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item>
            <Box mr={3}>
              <Typography variant="h5">Todo App</Typography>
            </Box>
          </Grid>
          <Grid item>
            <SearchInput />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

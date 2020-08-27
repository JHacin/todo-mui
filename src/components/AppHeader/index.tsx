import React, { FC } from 'react';
import { AppBar, Box, Grid, Hidden, Toolbar, Typography } from '@material-ui/core';
import { SearchInput } from './SearchInput';

export const AppHeader: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Hidden xsDown>
            <Grid item>
              <Box mr={3}>
                <Typography variant="h5">Todo App</Typography>
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm="auto">
            <SearchInput />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

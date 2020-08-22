import React, { FC } from 'react';
import { Button, Divider, Paper, TextField } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

export const AddTodoInput: FC = () => {
  return (
    <Paper component="form">
      <TextField autoFocus placeholder="Add an item..." />
      <Divider orientation="vertical" flexItem />
      <KeyboardDateTimePicker onChange={() => {}} value={new Date()} disablePast />
      <Button variant="contained" color="primary">
        Add
      </Button>
    </Paper>
  );
};

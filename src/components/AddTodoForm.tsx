import React, { FC, useRef } from 'react';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { addTodo } from '../redux/features/todos/todosSlice';
import { useAppDispatch } from '../redux/store';
import EventIcon from '@material-ui/icons/Event';
import dayjs from 'dayjs';
import { TodoFormValues, useTodoFormContext } from '../hooks/useTodoFormContext';

export const AddTodoForm: FC = () => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = ({ text, dueDate }: TodoFormValues): void => {
    dispatch(
      addTodo({
        text,
        dueDate: dueDate!.format(),
      })
    );

    updateField('text', '');
    textInputRef.current?.focus();
  };

  const { values, errors, onSubmit, touched, updateField, isValid } = useTodoFormContext({
    initialValues: {
      text: '',
      dueDate: null,
    },
    onSubmit: onSubmitHandler,
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm="auto">
          <TextField
            autoFocus
            placeholder="Add a task..."
            value={values.text}
            onChange={(event) => updateField('text', event.target.value)}
            inputRef={textInputRef}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm="auto">
          <DateTimePicker
            onChange={(date) => updateField('dueDate', date)}
            value={values.dueDate}
            disablePast
            ampm={false}
            initialFocusedDate={dayjs().add(1, 'hour')}
            placeholder="Select a due date..."
            helperText={touched.dueDate && errors.dueDate ? 'Please select a future date and time.' : ''}
            error={touched.dueDate && errors.dueDate}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Button type="submit" variant="contained" color="primary" disabled={!isValid} fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

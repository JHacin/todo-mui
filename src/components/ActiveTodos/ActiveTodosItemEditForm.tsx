import React, { FC } from 'react';
import { Todo } from '../../types';
import { Box, Button, InputAdornment, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import { TodoFormValues, useTodoFormContext } from '../../hooks/useTodoFormContext';
import dayjs from 'dayjs';

interface ActiveTodosItemEditFormProps {
  todo: Todo;
  onEditSubmit: (todo: Todo) => void;
}

export const ActiveTodosItemEditForm: FC<ActiveTodosItemEditFormProps> = ({ todo, onEditSubmit }) => {
  const onSubmitHandler = ({ text, dueDate }: TodoFormValues): void => {
    onEditSubmit({
      ...todo,
      text,
      dueDate: dueDate!.format(),
    });
  };

  const { values, errors, onSubmit, touched, updateField, isValid } = useTodoFormContext({
    initialValues: {
      text: todo.text,
      dueDate: dayjs(todo.dueDate),
    },
    onSubmit: onSubmitHandler,
  });

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" alignItems="flex-start">
        <Box mr={2}>
          <TextField
            autoFocus
            placeholder="Add a description..."
            helperText={touched.text && errors.text ? 'This field is required.' : ''}
            error={touched.text && errors.text}
            value={values.text}
            onChange={(event) => updateField('text', event.target.value)}
          />
        </Box>
        <Box mr={2}>
          <DateTimePicker
            onChange={(date) => updateField('dueDate', date)}
            value={values.dueDate}
            disablePast
            ampm={false}
            placeholder="Select a due date..."
            helperText={touched.dueDate && errors.dueDate ? 'Please select a future date and time.' : ''}
            error={touched.dueDate && errors.dueDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
          Update
        </Button>
      </Box>
    </form>
  );
};

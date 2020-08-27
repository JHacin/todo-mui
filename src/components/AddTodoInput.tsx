import React, { FC, useRef } from 'react';
import { Box, Button, InputAdornment, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { addTodo } from '../redux/features/todos/todosSlice';
import { useAppDispatch } from '../redux/store';
import EventIcon from '@material-ui/icons/Event';
import dayjs from 'dayjs';
import { TodoFormValues, useTodoFormContext } from '../hooks/useTodoFormContext';

export const AddTodoInput: FC = () => {
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
      <Box display="flex" alignItems="flex-start">
        <Box mr={2}>
          <TextField
            autoFocus
            placeholder="Add a task..."
            value={values.text}
            onChange={(event) => updateField('text', event.target.value)}
            inputRef={textInputRef}
          />
        </Box>
        <Box mr={2}>
          <DateTimePicker
            onChange={(date) => updateField('dueDate', date)}
            value={values.dueDate}
            disablePast
            ampm={false}
            initialFocusedDate={dayjs().add(1, 'hour')}
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
          Add
        </Button>
      </Box>
    </form>
  );
};

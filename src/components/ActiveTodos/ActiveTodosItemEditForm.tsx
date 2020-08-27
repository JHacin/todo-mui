import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Todo } from '../../types';
import { Box, Button, InputAdornment, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import EventIcon from '@material-ui/icons/Event';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { isDueDateExpired } from '../../util';

export const ActiveTodosItemEditForm: FC<{ todo: Todo; onSubmit: (todo: Todo) => void }> = ({
  todo,
  onSubmit,
}) => {
  const [text, setText] = useState<string>(todo.text);
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(dayjs(todo.dueDate));
  const [dueDateError, setDueDateError] = useState<boolean>(false);

  const isDueDateInvalid = (date: MaterialUiPickersDate): boolean => {
    return !date || isDueDateExpired(date);
  };

  const onTextChangeHandler: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const value = event.target.value;
    setText(value);
  };

  const onDueDateChangeHandler = (date: MaterialUiPickersDate): void => {
    setDueDateError(isDueDateInvalid(date));
    setDueDate(date);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    if (!text || !dueDate) {
      return;
    }

    if (isDueDateInvalid(dueDate)) {
      setDueDateError(true);
      return;
    }

    onSubmit({ ...todo, text, dueDate: dueDate.format() });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Box display="flex" alignItems="flex-start">
        <Box mr={2}>
          <TextField
            autoFocus
            placeholder="Add a description..."
            helperText={!text ? 'This field is required.' : ''}
            error={!text}
            value={text}
            onChange={onTextChangeHandler}
          />
        </Box>
        <Box mr={2}>
          <DateTimePicker
            onChange={onDueDateChangeHandler}
            value={dueDate}
            disablePast
            ampm={false}
            placeholder="Select a due date..."
            helperText={dueDateError ? 'Please select a future date and time.' : ''}
            error={dueDateError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!text || !dueDate || dueDateError}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

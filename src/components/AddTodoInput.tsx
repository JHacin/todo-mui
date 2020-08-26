import React, { ChangeEventHandler, FC, FormEventHandler, useRef, useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { addTodo } from '../redux/features/todos/todosSlice';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useAppDispatch } from '../redux/store';
import EventIcon from '@material-ui/icons/Event';
import dayjs from 'dayjs';
import { isDueDateExpired } from '../util';

export const AddTodoInput: FC = () => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>('');
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(null);
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

    dispatch(
      addTodo({
        text,
        dueDate: dueDate.format(),
      })
    );

    setText('');
    textInputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Box display="flex" alignItems="flex-start">
        <Box mr={2}>
          <TextField
            autoFocus
            placeholder="Add a task..."
            value={text}
            onChange={onTextChangeHandler}
            inputRef={textInputRef}
          />
        </Box>
        <Box mr={2}>
          <DateTimePicker
            onChange={onDueDateChangeHandler}
            value={dueDate}
            disablePast
            ampm={false}
            initialFocusedDate={dayjs().add(1, 'hour')}
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
          Add
        </Button>
      </Box>
    </form>
  );
};

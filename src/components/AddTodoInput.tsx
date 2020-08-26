import React, { ChangeEventHandler, FC, FormEventHandler, useRef, useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { addTodo } from '../redux/features/todos/todosSlice';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useAppDispatch } from '../redux/store';
import EventIcon from '@material-ui/icons/Event';

export const AddTodoInput: FC = () => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>('');
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(null);

  const onTextChangeHandler: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const value = event.target.value;
    setText(value);
  };

  const onDueDateChangeHandler = (date: MaterialUiPickersDate): void => {
    setDueDate(date);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    if (!text || !dueDate) {
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
      <Box display="flex">
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
            placeholder="Select a due date..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" disabled={!text || !dueDate}>
          Add
        </Button>
      </Box>
    </form>
  );
};

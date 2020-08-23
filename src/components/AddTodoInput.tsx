import React, { ChangeEventHandler, FC, FormEventHandler, useRef, useState } from 'react';
import { Button, Divider, Paper, TextField } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { addTodo } from '../redux/features/todos/todosSlice';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import dayjs from 'dayjs';
import { useAppDispatch } from '../redux/store';

const isValidDate = (date: MaterialUiPickersDate): boolean => {
  return !!(date && dayjs(date).isValid());
};

const REQUIRED_FIELD_MESSAGE = 'This field is required.';
const INVALID_DATE_MESSAGE = 'Please enter a valid date.';

export const AddTodoInput: FC = () => {
  const dispatch = useAppDispatch();
  const textInputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>('');
  const [textError, setTextError] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(dayjs().add(1, 'week'));
  const [dueDateError, setDueDateError] = useState<boolean>(false);

  const onTextChangeHandler: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const value = event.target.value;
    setTextError(!value);
    setText(value);
  };

  const onDueDateChangeHandler = (date: MaterialUiPickersDate): void => {
    setDueDateError(!isValidDate(date));
    setDueDate(date);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();

    if (!text || !dueDate) {
      setTextError(!text);
      setDueDateError(!isValidDate(dueDate));
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
    <Paper>
      <form onSubmit={onSubmitHandler}>
        <TextField
          autoFocus
          placeholder="Add an item..."
          value={text}
          onChange={onTextChangeHandler}
          error={textError}
          helperText={textError ? REQUIRED_FIELD_MESSAGE : ''}
          inputRef={textInputRef}
        />
        <Divider orientation="vertical" flexItem />
        <KeyboardDateTimePicker
          onChange={onDueDateChangeHandler}
          value={dueDate}
          disablePast
          error={dueDateError}
          helperText={dueDateError ? INVALID_DATE_MESSAGE : ''}
        />
        <Button type="submit" variant="contained" color="primary" disabled={textError || dueDateError}>
          Add
        </Button>
      </form>
    </Paper>
  );
};

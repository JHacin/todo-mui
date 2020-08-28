import React from 'react';
import { render, screen } from '../../../../test-utils';
import { EditTodoForm } from './index';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { createRandomTodo } from '../../../../test-utils/mock-generators';

const getTextInput = () => screen.getByPlaceholderText(/add a description.../i);
const getSubmitButton = () => screen.getByRole('button', { name: /update/i });

describe('EditTodoForm', () => {
  it('calls the submit handler', () => {
    const todo = createRandomTodo();
    const handler = jest.fn();
    render(<EditTodoForm todo={todo} onEditSubmit={handler} />);

    userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(todo);
  });

  it('is disabled if the text input is empty', () => {
    const todo = createRandomTodo();
    render(<EditTodoForm todo={todo} onEditSubmit={jest.fn()} />);
    userEvent.clear(getTextInput());
    expect(getSubmitButton()).toBeDisabled();
  });

  // Note: these tests could be improved by triggering the DateTimePicker component's onChange event somehow.
  // However, I haven't found a way to do it yet.
  it('is disabled if the date input is invalid', () => {
    const todo = createRandomTodo({ dueDate: dayjs().subtract(1, 'hour').format() });
    render(<EditTodoForm todo={todo} onEditSubmit={jest.fn()} />);
    expect(getSubmitButton()).toBeDisabled();
  });

  it('shows validation errors', () => {
    const todo = createRandomTodo();
    render(<EditTodoForm todo={todo} onEditSubmit={jest.fn()} />);
    userEvent.clear(getTextInput());
    expect(screen.getByText(/this field is required./i)).toBeInTheDocument();
  });
});

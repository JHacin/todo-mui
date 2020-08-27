import React from 'react';
import { createRandomTodo, render, screen } from '../../../../test-utils';
import { EditTodoForm } from './index';
import userEvent from '@testing-library/user-event';
import { Todo } from '../../../../types';

describe('EditTodoForm', () => {
  let todo: Todo;
  let handler: jest.Mock;

  beforeEach(() => {
    todo = createRandomTodo();
    handler = jest.fn();
    render(<EditTodoForm todo={todo} onEditSubmit={handler} />);
  });

  it('calls the submit handler', () => {
    userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(todo);
  });

  it('is disabled if one of the inputs is empty', () => {
    userEvent.clear(screen.getByPlaceholderText(/add a description.../i));
    expect(screen.getByRole('button', { name: /update/i })).toBeDisabled();
    // Todo: simulate datepicker onChange
  });

  it('shows validation errors', () => {
    userEvent.clear(screen.getByPlaceholderText(/add a description.../i));
    expect(screen.getByText(/this field is required./i)).toBeInTheDocument();
    // Todo: simulate datepicker onChange
  });
});

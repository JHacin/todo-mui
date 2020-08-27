import React from 'react';
import { render, screen } from '../../test-utils';
import { AddTodoForm } from './index';
import userEvent from '@testing-library/user-event';

describe('AddTodoForm', () => {
  beforeEach(() => {
    render(<AddTodoForm />);
  });

  it('autofocuses on the todo text input', () => {
    const textInput = screen.getByPlaceholderText(/add a task.../i);
    expect(textInput).toHaveFocus();
  });

  it('is by default empty', () => {
    const textInput = screen.getByPlaceholderText(/add a task.../i);
    expect(textInput).toHaveValue('');

    const dateInput = screen.getByPlaceholderText(/select a due date.../i);
    expect(dateInput).toHaveValue('');
  });

  it('requires both fields to be valid before submission', () => {
    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText(/add a task.../i), 'Do the dishes');
    expect(button).toBeDisabled();

    // Todo: simulate datepicker onChange and verify that the submit button is no longer disabled
  });

  // Todo: validate that after submit, the text input is empty and re-focused
});

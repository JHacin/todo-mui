import React from 'react';
import { render, screen } from '../../test-utils';
import { AddTodoForm } from './index';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

describe('AddTodoForm', () => {
  it('autofocuses on the todo text input', () => {
    render(<AddTodoForm />);
    const textInput = screen.getByPlaceholderText(/add a task.../i);
    expect(textInput).toHaveFocus();
  });

  it('is by default empty and disabled', () => {
    render(<AddTodoForm />);
    const textInput = screen.getByPlaceholderText(/add a task.../i);
    expect(textInput).toHaveValue('');

    const dateInput = screen.getByPlaceholderText(/select a due date.../i);
    expect(dateInput).toHaveValue('');

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeDisabled();
  });

  it('requires the text to not be empty', () => {
    render(<AddTodoForm initialValues={{ text: '', dueDate: dayjs().add(1, 'day') }} />);
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
  });

  it('requires the date to not be empty', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: null }} />);
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
  });

  it('requires the date to be in the future', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: dayjs().subtract(1, 'minute') }} />);
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
  });

  // Note: these tests could be improved by triggering the DateTimePicker component's onChange event somehow.
  // However, I haven't found a way to do it yet.
  it('can be submitted if both values are valid', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: dayjs().add(1, 'week') }} />);
    expect(screen.getByRole('button', { name: /add/i })).not.toBeDisabled();
  });

  it('clears and refocuses the text input after submit', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: dayjs().add(1, 'week') }} />);
    userEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByPlaceholderText(/add a task.../i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/add a task.../i)).toHaveValue('');
  });
});

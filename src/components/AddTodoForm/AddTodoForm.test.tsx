import React from 'react';
import { render, screen } from '../../test-utils';
import { AddTodoForm } from './index';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

const getTextInput = () => screen.getByPlaceholderText(/add a task.../i);
const getDateInput = () => screen.getByPlaceholderText(/select a due date.../i);
const getButton = () => screen.getByRole('button', { name: /add/i });

describe('AddTodoForm', () => {
  it('autofocuses on the todo text input', () => {
    render(<AddTodoForm />);
    expect(getTextInput()).toHaveFocus();
  });

  it('is by default empty and disabled', () => {
    render(<AddTodoForm />);
    expect(getTextInput()).toHaveValue('');
    expect(getDateInput()).toHaveValue('');
    expect(getButton()).toBeDisabled();
  });

  it('requires the text to not be empty', () => {
    render(<AddTodoForm initialValues={{ text: '', dueDate: dayjs().add(1, 'day') }} />);
    expect(getButton()).toBeDisabled();
  });

  it('requires the date to not be empty', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: null }} />);
    expect(getButton()).toBeDisabled();
  });

  it('requires the date to be in the future', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: dayjs().subtract(1, 'minute') }} />);
    expect(getButton()).toBeDisabled();
  });

  // Note: these tests could be improved by triggering the DateTimePicker component's onChange event somehow.
  // However, I haven't found a way to do it yet.
  it('can be submitted if both values are valid', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: dayjs().add(1, 'week') }} />);
    expect(getButton()).not.toBeDisabled();
  });

  it('clears and refocuses the text input after submit', () => {
    render(<AddTodoForm initialValues={{ text: 'Text', dueDate: dayjs().add(1, 'week') }} />);
    userEvent.click(getButton());
    expect(getTextInput()).toHaveFocus();
    expect(getTextInput()).toHaveValue('');
  });
});

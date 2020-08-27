import React from 'react';
import { render, screen } from '../../../../test-utils';
import { RemainingTimeLabel } from './index';
import dayjs from 'dayjs';

describe('RemainingTimeLabel', () => {
  it('prints an expiration message if the time has expired', () => {
    render(<RemainingTimeLabel dueDate={dayjs().subtract(1, 'hour')} />);
    expect(screen.getByText(/this task has expired./i)).toBeInTheDocument();
  });

  it('prints the remaining time', () => {
    render(<RemainingTimeLabel dueDate={dayjs().add(1, 'hour')} />);
    expect(screen.getByText(/1 hour/i)).toBeInTheDocument();
  });
});

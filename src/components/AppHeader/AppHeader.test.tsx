import React from 'react';
import { render, screen } from '../../test-utils';
import { AppHeader } from './index';

describe('AppHeader', () => {
  it('renders correctly', () => {
    render(<AppHeader />);
    expect(screen.getByText(/todo app/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/find a task.../i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '../../../test-utils';
import { TodoListWrapper } from './index';

describe('TodoListWrapper', () => {
  it('renders the title', () => {
    render(<TodoListWrapper title="Hello" />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});

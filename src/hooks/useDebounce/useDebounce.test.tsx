import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from './index';
import { FC } from 'react';
import { render } from '../../test-utils';
import { act } from '@testing-library/react';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('handles an initial value', () => {
    const value = 100;

    const { result } = renderHook(() => useDebounce<typeof value>(value, 50));

    expect(result.current).toEqual(value);
  });

  it('correctly delays updating the returned value', () => {
    const delay = 200;
    const initialText = 'Hello there.';
    const updatedText = 'Hello to you too!';

    const Component: FC<{ text: string }> = ({ text }) => {
      const debouncedText = useDebounce<string>(text, delay);
      return <div>{debouncedText}</div>;
    };

    const { container, rerender } = render(<Component text={initialText} />);

    // Check initial value
    expect(container.textContent).toBe(initialText);

    // Using rerender does not unmount the component, allowing us to manually update its props.
    rerender(<Component text={updatedText} />);

    // Verify that the value has not immediately changed.
    expect(container.textContent).toBe(initialText);

    // Verify that the value has not changed before the timer / delay has expired.
    act(() => {
      jest.advanceTimersByTime(delay - 1);
    });
    expect(container.textContent).toBe(initialText);

    // The value should update after the timer has run out.
    act(() => {
      jest.runAllTimers();
    });
    expect(container.textContent).toBe(updatedText);
  });
});

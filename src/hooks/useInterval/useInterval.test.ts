import { useInterval } from './index';
import { renderHook } from '@testing-library/react-hooks';

jest.useFakeTimers();

describe('useInterval', () => {
  it('calls the handler a correct amount of times', () => {
    const delay = 1000;
    const handler = jest.fn();

    renderHook(() => {
      useInterval(handler, delay);
    });

    expect(handler).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(delay * 20);
    expect(handler).toHaveBeenCalledTimes(20);
  });
});

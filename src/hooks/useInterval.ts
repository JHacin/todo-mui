import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number): void => {
  const savedCallback = useRef<Function>();

  const tick = (): void => {
    if (savedCallback.current) {
      savedCallback.current();
    }
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect((): void | (() => void) => {
    const intervalId = setInterval(() => tick(), delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);
};

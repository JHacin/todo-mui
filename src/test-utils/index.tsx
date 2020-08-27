import React, { FC, ReactElement } from 'react';
import { Todo, TodoStatus } from '../types';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { render as rtlRender, RenderOptions as RtlRenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { initStore } from '../redux/store';
import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { initialRootState, RootState } from '../redux';
import mediaQuery from 'css-mediaquery';
import { SnackbarProvider } from 'notistack';
export * from '@testing-library/react';

interface RenderOptions extends RtlRenderOptions {
  initialState?: RootState;
  store?: EnhancedStore<RootState>;
}

export const render = (
  ui: ReactElement,
  {
    initialState = initialRootState,
    store = initStore({ fallbackState: initialState }),
    ...renderOptions
  }: RenderOptions = {} as RenderOptions
) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export const createMatchMedia = (width: number) => {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: '',
    onchange: () => {},
    dispatchEvent: () => true,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  });
};

export const createRandomTodo = (data?: Partial<Todo>): Todo => {
  return {
    id: uuid(),
    status: TodoStatus.Active,
    text: 'Random todo',
    dueDate: dayjs()
      .add(Math.floor(Math.random() * 366), 'day')
      .format(),
    ...data,
  };
};

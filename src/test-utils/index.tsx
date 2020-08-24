import React from 'react';
import { Todo, TodoType } from '../types';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { render as rtlRender, RenderOptions as RtlRenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { todosInitialState } from '../redux/features/todos/todosSlice';
import { initStore, RootState } from '../redux/store';
import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export * from '@testing-library/react';

interface RenderOptions extends RtlRenderOptions {
  initialState?: RootState;
  store?: EnhancedStore<RootState>;
}

export const render = (
  ui: ReactElement,
  {
    initialState = { todos: todosInitialState },
    store = initStore({ fallbackState: initialState }),
    ...renderOptions
  }: RenderOptions = {} as RenderOptions
) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DayjsUtils}>{children}</MuiPickersUtilsProvider>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export const createRandomTodo = (type: TodoType = TodoType.Active): Todo => {
  return {
    id: uuid(),
    type,
    text: 'Random todo',
    dueDate: dayjs()
      .add(Math.floor(Math.random() * 366), 'day')
      .format(),
  };
};

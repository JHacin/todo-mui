import React, { FC, ReactElement } from 'react';
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

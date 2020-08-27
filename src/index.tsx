import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import { App } from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CronWrapper } from './components/CronWrapper/CronWrapper';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <SnackbarProvider maxSnack={3}>
        <CronWrapper>
          <App />
        </CronWrapper>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
);

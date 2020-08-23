import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import { App } from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
);

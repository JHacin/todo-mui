import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import 'material-design-icons/iconfont/material-icons.css';
import { App } from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

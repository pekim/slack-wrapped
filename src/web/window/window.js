import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as windowState from './window-state';

import registerIpcListeners from './register-ipc-listeners';
import Root from 'web/component/root.js';
import ducks from 'web/ducks';
import 'web/css/global.css';

registerIpcListeners();

windowState.restore();
windowState.saveRegularly();

const store = createStore(ducks);

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('content')
);

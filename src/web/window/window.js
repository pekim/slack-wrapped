import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Root from 'web/component/root.js';
import ducks from 'web/ducks';
import 'web/css/global.css';

const store = createStore(ducks);

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('content')
);

import { a1 } from 'web/ducks/duck-1';
setInterval(() => {
  store.dispatch(a1());
}, 100);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';

import rootRoute from './routes';
import './style/common.less';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <div>
    <Provider store={store}>
      <Router history={browserHistory} routes={rootRoute} />
    </Provider>
  </div>,
  document.getElementById('root')
);

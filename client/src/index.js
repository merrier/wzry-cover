import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import rootRoute from './routes';
import './style/common.less';

render(
  <div>
    <Router history={browserHistory} routes={rootRoute} />
  </div>,
  document.getElementById('root')
);

import '@styles/antd.less';
import '@styles/styles.scss';
import '@src/shared/utils/axios.service';

import { store } from '@config/StoreConfiguration';
import { App } from '@src/App';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

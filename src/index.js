import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import './less/styles.less';
import App from './components/App';
import reducer from './reducers';
import sockerMiddleware from './middleware/socket';

const middleware = applyMiddleware(sockerMiddleware);
const store  = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
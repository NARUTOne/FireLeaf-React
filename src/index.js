// alert('hello world !');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import RouterList from './router.js';
import reducer from './reducer/';
import './xhr_config.js';

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
console.log(store.getState());

const hotRender = Component => render(
  <Provider store={store}>
    <Component />
  </Provider>
  , document.getElementById('app'));

hotRender(RouterList);

// dev-server
if(process.env.NODE_ENV !== 'production') {
  if(module.hot) {
    module.hot.accept(RouterList, () => {
      hotRender(RouterList);
    });
  }
}


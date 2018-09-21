/**
 * index 入口
 */

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
// 引入路由配置模块
import RouterList from './router/';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/';

import './style/index.less';

// redux 注入操作
const middleware = [];
const store = createStore(reducer, applyMiddleware(...middleware));
// console.log(store.getState());

const mountNode = document.getElementById('app'); // 设置要挂在的点

const hotRender = Component => ReactDom.render(
  <AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>
  </AppContainer>
, mountNode);

hotRender(RouterList);

// console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
  if(module.hot) {
    module.hot.accept('./router/', () => {
      // https://github.com/gaearon/react-hot-loader/issues/511#issuecomment-288673129
      const RouterList = require('./router/').default;
      hotRender(RouterList);
    });
  } 
}


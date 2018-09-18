/**
 * index 入口
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
// 引入路由配置模块
import RouterList from './router/';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/';

import './style/comment.less';

// redux 注入操作
const middleware = [];
const store = createStore(reducer, applyMiddleware(...middleware));
// console.log(store.getState());

const mountNode = document.getElementById('app'); // 设置要挂在的点

const hotRender = Component => render(
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
    console.log('refresh-hot');
    module.hot.accept('./router/', (err) => {
      console.log('refresh-hot-1');
      if (err) {
        console.log(err);
      }
      unmountComponentAtNode(mountNode);
      hotRender(RouterList);
    });
  } 
}


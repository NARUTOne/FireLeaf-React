import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';  
import thunk from 'redux-thunk';
// 引入路由配置模块
import RouterList from './router.js';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer/';
import './xhr_config.js';

// redux 注入操作
const middleware = [thunk];
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


// if(process.env.NODE_ENV === 'development') {
//   if(module.hot) {
//     module.hot.accept();
//   }
// }

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
  if(module.hot) {
    console.log('refresh-hot');
    module.hot.accept('./router', (err) => {
      console.log('refresh-hot-1');
      if (err) {
        console.log(err);
      }
      /*
          卸载 react 模块后 重装
      */ 
      const RouterList = require('./router').default;
      hotRender(RouterList);
    });
  } 
}


/**
 * 前端路由配置
 */

import React, {Component} from 'react';
import { Router, Route, IndexRedirect, browserHistory} from 'react-router';
import auth from 'utils/auth';
import {PName} from 'utils/config';
import App from './pages/app/';

// 用户登录验证
function requireAuth(nextState, replace) {
  const path = nextState.location.pathname;
  const loginPath = PName + '/login';
  
  if (!auth.isLoginIn()) {
    path !== loginPath && replace({
      pathname: PName + '/login',
      state: {
        referrer: path
      }
    });
  }
}

export default class RouterList extends Component{
	render() {
		return (
			<Router
        history={browserHistory}
      >
        <Route path={PName ? PName : '/'}
          onEnter={(...args) => {
          requireAuth(...args);
        }}
        component={App} 
        breadcrumbName="/">
          <IndexRedirect to={PName + "/todo"} />
          <Route path='todo'  getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/todo/').default);
            });
          }} breadcrumbName="todo"/>
          <Route path='login'  getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/login/').default);
            });
          }} />
          <Route path="*" getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/notFound/').default);
            });
          }} />
        </Route>
      </Router>
		);
	}
}

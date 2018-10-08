import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import auth from '@/utils/auth';

// PureComponent 采用导致Route无法更新
class RenderRouter extends Component {
  requireLogin = (component, login) => {
    // console.log(login);
    const {isLogin, user} = login;
    if (!isLogin && !user && !auth.isLoginIn()) {
      return <Redirect to={'/login'} />;
    }
    return component;
  }
  render() {
    const {isLogin, user} = this.props;
    const login = {isLogin, user};
    return (
      <Switch>
        {this.props.routers.map((item, index) => {
          const ComponentPage = item.component;
          return <Route
            exact={item.exact}
            path={item.path}
            render={props => this.requireLogin(<ComponentPage {...props} routers={item.children || []}></ComponentPage>, login) }
            key={'page' + index + item.path}/>;
        })}
        <Route render={() => <Redirect to="/404" push/>} />
      </Switch>  
    );
  }
}

const mapStateToPorps = state => {
  const {login} = state;
  return Object.assign({}, login);
};

export default connect(mapStateToPorps)(RenderRouter);


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RenderRouter from '@/components/RenderRouter/';
import {Layout} from 'antd';
import {loginAction} from '@/store/action/';
import AHeader from './AHeader';
import ASider from './ASider';
import ABody from './ABody';
import AFooter from './AFooter';
import BreadcrumpCustom from './BreadcrumpCustom/';
import auth from '@/utils/auth';

const {refreshLogin} = loginAction;

class App extends Component {
  constructor () {
    super();
    this.state = {
      collapsed: false
    };
  }

  static getDerivedStateFromProps (nextProps, prevState) { // nextProps, prevState
    const {isLogin} = nextProps;
    if (!isLogin && auth.isLoginIn()) {
      const data = Object.assign({}, auth.user);
      // console.log(auth.user);
      nextProps.refreshLogin(data);
    }

    return Object.assign({}, prevState);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const {location, routers, user, isLogin} = this.props;
    const path = location.pathname;
    const login = {
      user,
      isLogin
    };

    // console.log(location);
    return (
      <div className="page">
        <Layout>
          <ASider collapsed={this.state.collapsed} path={path}></ASider>
          <Layout>
            <AHeader toggle={this.toggle} open={this.state.collapsed}></AHeader>
            <ABody>
              <BreadcrumpCustom></BreadcrumpCustom>
              <div className="page-body">
                <RenderRouter routers={routers} login={login}></RenderRouter>
              </div>              
            </ABody>
            <AFooter></AFooter>
          </Layout>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToPorps = state => {
  const {login} = state;
  return Object.assign({}, login);
};

function mapDispatchToProps(dispatch) {
  return {
    refreshLogin: bindActionCreators(refreshLogin, dispatch)
  };
}

export default connect(mapStateToPorps, mapDispatchToProps)(withRouter(App));
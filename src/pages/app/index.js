import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import { enquireScreen } from 'enquire-js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { loginAction } from 'src/action/';

import HeaderToggle from './headerToggle/';
import Head from './head';
import SiderCustom from './sider/';
import Body from './body/';
import Foot from './footer/';
import {Layout, Breadcrumb} from 'antd';
import auth from 'src/utils/auth';
import './index.less';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

const {
  logoutSuccess,
  loginSuccess
} = loginAction;

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
    isMobile
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  static childContextTypes = {
    isMobile: PropTypes.bool,
  };

  getChildContext() {
    return {
      isMobile: this.state.isMobile,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });

    if (auth.isLoginIn()) {
      const data = auth.user;
      this.props.loginSuccess(data);
    }
  }

  render() {
    const { children, routes, params, location, user, logoutSuccess } = this.props;

    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? <span>{route.breadcrumbName}</span> : <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    // console.log(routes)
    const comment = (<Layout  key="layout" className='layout-row'>
      <SiderCustom  key="sider" path={routes[1].path} collapsed={this.state.collapsed} />
      <Layout  key="layout-content">
        <HeaderToggle key="header" theme={'dark'} location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/>
        {/* <Head key="header" location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/> */}
        <Body key="body">
          <Breadcrumb routes={routes} params={params} itemRender={itemRender} separator=">" style={{padding: '0 0 8px'}}/>
          {children}
        </Body>
        <Foot  key="footer"/>
      </Layout>
    </Layout>);

    let main = [comment];

    // 登录页和 404 页不渲染 Header
    if (routes[1]) {
      const path = routes[1].path;
      if (path === 'login' || path === '*') {
        main = [<Body key="body">
          {children}
        </Body>, <Foot  key="footer"/>];
      }
    }

    return (
      <div className="wrapper">
        <Layout>
          {main}
        </Layout>          
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  const { login } = state;
  // console.log(login)
  return {
    user: login.user || null
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logoutSuccess: bindActionCreators(logoutSuccess, dispatch),
    loginSuccess: bindActionCreators(loginSuccess, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

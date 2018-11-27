import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen, unenquireScreen } from 'enquire-js';
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

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};
class App extends Component {
  constructor () {
    super();
    this.state = {
      collapsed: false,
      isMobile: false
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

  componentDidMount () {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentWillUnmount () {
    unenquireScreen(this.enquireHandler);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const {location, routers} = this.props;
    const path = location.pathname;

    // console.log(location);
    return (
      <div className="app-page">
        <Layout className="app-page-layout">
          <ASider collapsed={this.state.collapsed} path={path}></ASider>
          <Layout>
            <AHeader toggle={this.toggle} open={this.state.collapsed}></AHeader>
            <ABody>
              <BreadcrumpCustom></BreadcrumpCustom>
              <div className="page-body">
                <RenderRouter routers={routers}></RenderRouter>
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
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import RenderRouter from '@/components/RenderRouter/';
import {Layout} from 'antd';
import {loginAction} from '@/store/action/';
import AHeader from './AHeader';
import ASider from './ASider';
import ABody from './ABody';
import AFooter from './AFooter';
import routers from '@/router/router.config';
import BreadcrumpCustom from './BreadcrumpCustom/';
import auth from '@/utils/auth';
import {systemName} from '@/utils/config';
import {arrayTreeCallBack, getNodeByKeys} from 'utils/tools';
import navList from '@/mock/navs';

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
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.state = {
      collapsed: false,
      isMobile: false,
      openKeys: []
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
    this.setMenu(this.props);
  }

  componentWillUnmount () {
    unenquireScreen(this.enquireHandler);
  }

  setMenu = props => {
    const path = props.location.pathname;
    const nodes = getNodeByKeys(routers, [path], 'path');
    if (!nodes.length) return;
    const {openKey, selectedKey} = nodes[0];

    this.setState({
      openKeys: [openKey] || [],
      selectedKey: selectedKey || ''
    });
  }

  /*
   * 获取面包屑map 
   */

  getBreadcrumbNameMap () {
    const breadcrumpMap = [];
    arrayTreeCallBack(routers, (item) => {
      breadcrumpMap.push(item);
      return item;
    });
    return breadcrumpMap;
  }

  getPageTitle (pathname) {
    const curr = this.breadcrumbNameMap.find(item => item.path === pathname);
    const title = curr.title || '';

    return `${title} - ${systemName}`;
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleOpenChange = openKeys => {
    this.setState({
      openKeys: [...openKeys],
    });
  };

  render () {
    const {location, routers} = this.props;
    const { selectedKey, openKeys, collapsed } = this.state;
    const defaultProps = collapsed ? { selectedKey } : { openKeys, selectedKey };
    const pathname = location.pathname;

    return (
      <DocumentTitle title={this.getPageTitle(pathname)}>
        <ContainerQuery query={query}>
          {queryClassName => (
            <div className={classnames("app-page", queryClassName)}>
              <Layout className="app-page-layout">
                <ASider 
                  theme="light"
                  isMobile={this.state.isMobile}
                  collapsed={this.state.collapsed}
                  handleOpenChange={this.handleOpenChange}
                  onCollapse={this.toggle}
                  path={pathname}
                  menuData={navList}
                  {...defaultProps}></ASider>
                <Layout>
                  <AHeader toggle={this.toggle} open={this.state.collapsed}></AHeader>
                  <ABody>
                    <BreadcrumpCustom mapData={this.breadcrumbNameMap}></BreadcrumpCustom>
                    <div className="page-body">
                      <RenderRouter routers={routers}></RenderRouter>
                    </div>              
                  </ABody>
                  <AFooter></AFooter>
                </Layout>
              </Layout>
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle> 
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

export default withRouter(connect(mapStateToPorps, mapDispatchToProps)(App));
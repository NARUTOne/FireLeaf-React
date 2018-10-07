/**
 * app sider
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { systemName } from 'utils/config';
import navList from '@/mock/navs';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const DEFAULT_PATH = 'home';

class ASider extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    openKey: '',
    selectedKey: ''
  };
  componentDidMount() {
    this.setMenuOpen(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.collapsed != nextProps.collapsed) {
      this.onCollapse(nextProps.collapsed);
      this.setMenuOpen(nextProps);
    }
  }
  setMenuOpen = props => {
    const {path} = props;
    this.setState({
      openKey: path,
      selectedKey: path
    });
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });

  };
  openMenu = v => {
    this.setState({
      openKey: v[v.length - 1]
    });
  };

  handleJump = () => {
    this.props.history.push('/');
    this.setState({
      openKey: DEFAULT_PATH,
      selectedKey: DEFAULT_PATH
    });
  }

  renderNav(navData) {
    return navData.map((item) => {
      if(item.children && item.children.length) {
        return (<SubMenu key={item.key} title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}>
          {this.renderNav(item.children)}
        </SubMenu>);
      }
      else {
        return (<Menu.Item key={item.key}>
          <Link to={item.href}><Icon type={item.icon} /><span className="nav-text">{item.name}</span></Link>
        </Menu.Item>);
      }
    });
  }

  render() {
    const {theme} = this.props;

    const styleTheme = theme ? theme : 'default'; 
    const classNameStyle = classnames('sider', {
      [`sider-${styleTheme}`]: true
    });

    return ( 
      <Sider
      trigger={null}
      breakpoint="lg"
      collapsed={this.props.collapsed}
      style="overflowY: 'auto'"
      collapsedWidth={80}
      width={210}
      theme={styleTheme === 'default' ? 'light': styleTheme}
      className={classNameStyle}
    >
      <div className="sider-logo">
        <a onClick={this.handleJump} className={classnames('logo', {"logo-max": !this.state.collapsed, 'logo-min': !!this.state.collapsed, 'hide': !!this.props.hideLogo})}>
          {!this.state.collapsed ? systemName : null}
        </a>
      </div>
      <Menu
        onClick={this.menuClick}
        mode={this.state.mode}
        selectedKeys={[this.state.selectedKey]}
        theme={styleTheme === 'default' ? 'light': styleTheme}
      >
        {this.renderNav(navList)}
      </Menu>
    </Sider>);
  }
}

ASider.propTypes = {
  history: PropTypes.object.isRequired,
  // 主题，dark/light/default
  theme: PropTypes.string,
  hideLogo: PropTypes.bool, // 默认 false
};

export default withRouter(ASider);
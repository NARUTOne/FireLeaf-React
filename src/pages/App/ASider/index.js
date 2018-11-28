/**
 * app sider
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Drawer} from 'antd';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { systemName } from 'utils/config';
import Logo from '../Logo/';
import NavCustom from '../NavCustom/';


const { Sider } = Layout;

const SiderMenu = props => {
  const {theme, hideLogo, menuData, collapsed, onCollapse} = props;

  const styleTheme = theme ? theme : 'default'; 
  const classNameStyle = classnames('sider', {
    [`sider-${styleTheme}`]: true
  });

  return ( 
    <Sider
    trigger={null}
    breakpoint="lg"
    collapsed={collapsed}
    collapsedWidth={80}
    width={210}
    theme={styleTheme}
    className={classNameStyle}
    onCollapse={onCollapse}
  >
    <Logo collapsed={collapsed} hideLogo={hideLogo}>{!collapsed ? systemName : null}</Logo>
    <NavCustom style={{ padding: '16px 0', width: '100%' }} menuData={menuData} mode="inline" {...props}></NavCustom>
  </Sider>);
};

const ASider = props => {
  const {isMobile, collapsed} = props;
  return (
    isMobile ? (
      <Drawer
        width={210}
        closable={false}
        visible={!collapsed}
        placement="left"
        onClose={() => {
          props.onCollapse && props.onCollapse(true);
        }}
        style={{
          padding: 0,
          height: '100vh',
        }}
      >
        <SiderMenu
          {...props}
          collapsed={isMobile ? false : collapsed}
        />
      </Drawer>
    ) : (
      <SiderMenu {...props}/>
    )
  );
};

ASider.defaultProps = {
  theme: 'light',
  hideLogo: false,
  menuData: []
};

ASider.propTypes = {
  history: PropTypes.object.isRequired,
  // 主题，dark/light/default
  theme: PropTypes.string,
  hideLogo: PropTypes.bool, // 默认 false
  menuData: PropTypes.array
};

export default withRouter(ASider);
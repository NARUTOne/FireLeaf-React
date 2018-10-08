/**
 * app sider
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout} from 'antd';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { systemName } from 'utils/config';
import Logo from '../Logo/';
import NavCustom from '../NavCustom/';
import navList from '@/mock/navs';

const { Sider } = Layout;

class ASider extends Component {
  state = {
    collapsed: false,
  };
  componentDidMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.collapsed != nextProps.collapsed) {
      this.onCollapse(nextProps.collapsed);
    }
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
  };

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
      collapsed={this.state.collapsed}
      style="overflowY: 'auto'"
      collapsedWidth={80}
      width={210}
      theme={styleTheme}
      className={classNameStyle}
    >
      <Logo collapsed={this.state.collapsed} hideLogo={this.props.hideLogo}>{!this.state.collapsed ? systemName : null}</Logo>
      <NavCustom data={navList} mode="inline" theme={styleTheme}></NavCustom>
    </Sider>);
  }
}

ASider.defaultProps = {
  theme: 'light',
  hideLogo: false
};

ASider.propTypes = {
  history: PropTypes.object.isRequired,
  // 主题，dark/light/default
  theme: PropTypes.string,
  hideLogo: PropTypes.bool, // 默认 false
};

export default withRouter(ASider);
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {history} from 'react-router-dom';
import classnames from 'classnames';
import {Layout, Icon} from 'antd';

const {Header} = Layout;

class AHeader extends Component {
  constructor () {
    super();
    this.state = {

    };
  }

  handleLogin = (e) => {
    e.preventDefault();
  }

  handleLogout = (e) => {
    e.preventDefault();
  }

  render () {
    const {user, theme} = this.props;
    const styleTheme = theme ? theme : 'default'; 
    const classNameStyle = classnames('header', 'clear-float', {
      [`header-${styleTheme}`]: true
    });
    return (
      <Header className={classNameStyle} >
      <div className='left' >
        <Icon
          className="trigger custom-trigger"
          type={this.state.open ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
      </div>
      <div className="header__right right" >
        {user ? 
         <div>{user.userName} &nbsp; <span className="ant-divider" /> &nbsp; <Icon type='logout' onClick={this.handleLogout}/></div>:
         <Icon type='login' onClick={this.handleLogin}/> }
      </div>
    </Header>
    );
  }
}


AHeader.propTypes = {
  // 主题，dark/light/default
	theme: PropTypes.string,
  location: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};


export default AHeader;

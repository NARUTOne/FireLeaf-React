import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {loginAction} from '@/store/action/';
import {Layout, Icon} from 'antd';

const {Header} = Layout;
const {toLogout} = loginAction;

class AHeader extends Component {
  constructor () {
    super();
    this.state = {

    };
  }

  componentDidUpdate () {
    const {user, isLogin} = this.props;

    if (!user || !isLogin) {
      console.log(2);
      this.props.history.push('/login');
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.toLogout();
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.toLogout();
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
         <div>{user.userName} &nbsp; <span className="ant-divider" /> &nbsp; <Icon type='logout' onClick={this.handleLogout} title="登出"/></div>:
         <div onClick={this.handleLogin} className="pointer"><Icon type='login' title="登录"/> 登录</div>}
      </div>
    </Header>
    );
  }
}

AHeader.propTypes = {
  // 主题，dark/light/default
	theme: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToPorps = state => {
  const {login} = state;

  return Object.assign({}, login);
};

function mapDispatchToProps (dispatch) {
  return {
    toLogout: (params) => {
      toLogout(params, dispatch);
    }
  };
}

export default connect(mapStateToPorps, mapDispatchToProps)(withRouter(AHeader));

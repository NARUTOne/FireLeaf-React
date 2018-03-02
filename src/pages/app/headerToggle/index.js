import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Layout, Icon } from 'antd';
import {PName} from 'utils/config';
import './index.less';

const { Header } = Layout;

class Head extends Component {

  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.setState({open: this.props.open});
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.open != nextProps.open) {
      this.setState({open: nextProps.open});
    }
  }

  handleLogout = e => {
    e.preventDefault();

    const {logout} = this.props;
    const msg = '已登出！';

    logout(msg);

    browserHistory.push({
      pathname: PName + '/login',
      state: {
        referrer: this.props.location.pathname
      }
    });
  }

  handleLogin = e => {
    e.preventDefault();
   
    browserHistory.push({
      pathname: PName + '/login',
      state: {
        referrer: this.props.location.pathname
      }
    });
  }

  render() {
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

Head.propTypes = {
  // 主题，dark/light/default
	theme: PropTypes.string,
  location: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default Head;
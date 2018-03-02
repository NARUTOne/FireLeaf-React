import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Layout, Icon, Row, Col, Popover, Menu } from 'antd';
import { systemName, PName, navList } from 'utils/config';
import './index.less';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class Head extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool.isRequired,
  }
 
  constructor() {
    super();

    this.state = { 
      menuVisible: false,
    };
  }

  componentDidMount() {
    this.handleShowMenu();
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  }

  onMenuVisibleChange = (visible) => {
    this.setState({
      menuVisible: visible,
    });
  }

  renderNav(menuMode, activeMenuItem) {
    return  (<Menu
        selectedKeys={[activeMenuItem]}
        mode={menuMode}
        style={{backgroundColor: 'transparent', borderBottom: 'none'}}
        className='header-menu-antd'
      >
      {navList.map((item) => {
        if(item.children && item.children.length) {
          return (<SubMenu key={item.key} title={<Link to={item.href}>{item.name}</Link> }>
            {item.children.map((list) => {
                return (<Menu.Item key={list.key}>
                  <Link to={list.href}>{list.name}</Link> 
                </Menu.Item>);
            })}
          </SubMenu>);
        }
        else {
          return (<Menu.Item key={item.key}>
            <Link to={item.href}>{item.name}</Link> 
          </Menu.Item>);
        }
      })}
    </Menu>);
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
    const { menuVisible } = this.state;
    const { isMobile } = this.context;
    const { location, user, theme } = this.props;

    const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(-1).join('');
    const activeMenuItem = module || 'home';
    // console.log(activeMenuItem)
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const headNav = menuVisible ? this.renderNav(menuMode, activeMenuItem) : null;
    const styleTheme = theme ? theme : 'default'; 
    const classNameStyle = classnames('header', {
      [`header-${styleTheme}`]: true
    });

    return (
      <Header className={classNameStyle} >
        <header>
          <Row>
            <Col xxl={5} xl={6} lg={6} md={7} sm={12} xs={12}>
              <Link to={PName} className="header__logo">
                {systemName}
              </Link>
            </Col>
            <Col xxl={14} xl={12} lg={12} md={10} sm={0} xs={0}>
              <div className="header__nav__box">
                {!isMobile && headNav}
              </div>
            </Col>
            <Col xxl={5} xl={6} lg={6} md={7} sm={12} xs={12}>
              {user ? 
                <div className="header__user">
                  {user.userName} &nbsp; <span className="ant-divider" /> &nbsp; <Icon type='logout' onClick={this.handleLogout}/>
                </div>:
                <Icon type='login' onClick={this.handleLogin}/> 
              }           
            </Col>
          </Row>
          {isMobile ? <div className="header__mobile__nav" ><Popover 
              arrowPointAtCenter
              placement="bottomRight"
              trigger="click"
              content={<div className='popover__nav'>{headNav}</div>} 
              title="">
              <Icon type="bars" className='header__nav-toggle '/>
            </Popover> 
          </div>: null}
        </header>
      </Header>
    );
  }
}

Head.propTypes = {
  // 主题，dark/light/default
	theme: PropTypes.string
};

export default Head;
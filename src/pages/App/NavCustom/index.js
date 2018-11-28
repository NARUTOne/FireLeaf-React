import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className="menu-icon" />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

class NavCustom extends Component {
  state = {
    selectedKey: ''
  };

  componentDidMount() {
    this.setMenuOpen(this.props);
  }

  // 刷新
  static getDerivedStateFromProps (nextProps, prevState) { // nextProps, prevState
    if (nextProps.selectedKey !== prevState.selectedKey) {
      return {
        selectedKey: prevState.selectedKey || nextProps.selectedKey
      };
    }
    return null;
  }

  setMenuOpen = props => {
    const {selectedKey} = props;
    this.setState({
      selectedKey: selectedKey
    });
  };

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const name = item.name;
    const itemPath = item.href;
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^http(s?):\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target || '_blank'}>
          {icon}
          <span className="nav-text">{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span className="nav-text">{name}</span>
      </Link>
    );
  };

  renderNav(navData) {
    return navData.map((item) => {
      if(item.children && item.children.length) {
        return (<SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : null}<span className="nav-text">{item.name}</span></span>}>
          {this.renderNav(item.children)}
        </SubMenu>);
      }
      else {
        return (<Menu.Item key={item.key}>
          {this.getMenuItemPath(item)}
        </Menu.Item>);
      }
    });
  }

  render () {
    const {menuData, theme, openKeys, style} = this.props;

    const styleTheme = theme ? theme : 'default'; 
    const classNameStyle = classnames('a-nav', {
      [`nav-${styleTheme}`]: true
    });
    let props = {};
    if (openKeys) {
      props = {
        openKeys,
      };
    }
    return (
      <div className={classNameStyle}>
        <Menu
          key="Menu"
          onClick={this.menuClick}
          mode={this.props.mode}
          selectedKeys={[this.state.selectedKey]}
          onOpenChange={this.props.handleOpenChange}
          theme={styleTheme}
          style={style}
          {...props}
        >
          {this.renderNav(menuData)}
        </Menu>
      </div>
    );
  }
}

NavCustom.propTypes = {
  location: PropTypes.object.isRequired,
  menuData: PropTypes.array.isRequired,
  theme: PropTypes.string, // default light dark
  mode: PropTypes.string // vertical vertical-right horizontal inline
};

NavCustom.defaultProps = {
  mode: 'inline'
};

export default withRouter(NavCustom);
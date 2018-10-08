import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class NavCustom extends Component {
  state = {
    navList: [],
    openKey: '',
    selectedKey: ''
  };

  componentDidMount() {
    this.setState({
      navList: [...this.props.data]
    });
    this.setMenuOpen(this.props);
  }

  static getDerivedStateFromProps (nextProps, prevState) { // nextProps, prevState
    if (prevState.navList !== nextProps.data) {
      
      return {
        navList: nextProps.data
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.navList === null) {
      this.setMenuOpen(this.props);
    }
  }

  setMenuOpen = props => {
    const path = props.location.pathname;
    this.setState({
      openKey: path,
      selectedKey: path
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

  renderNav(navData) {
    return navData.map((item) => {
      if(item.children && item.children.length) {
        return (<SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : null}<span className="nav-text">{item.name}</span></span>}>
          {this.renderNav(item.children)}
        </SubMenu>);
      }
      else {
        return (<Menu.Item key={item.key}>
          <Link to={item.href}>{item.icon ? <Icon type={item.icon} /> : null}<span className="nav-text">{item.name}</span></Link>
        </Menu.Item>);
      }
    });
  }

  render () {
    const {theme} = this.props;

    const styleTheme = theme ? theme : 'default'; 
    const classNameStyle = classnames('a-nav', {
      [`nav-${styleTheme}`]: true
    });
    return (
      <div className={classNameStyle}>
        <Menu
          onClick={this.menuClick}
          mode={this.props.mode}
          selectedKeys={[this.state.selectedKey]}
          theme={styleTheme}
        >
          {this.renderNav(this.state.navList)}
        </Menu>
      </div>      
    );
  }
}

NavCustom.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  theme: PropTypes.string, // default light dark
  mode: PropTypes.string // vertical vertical-right horizontal inline
};

NavCustom.defaultProps = {
  mode: 'inline'
};

export default withRouter(NavCustom);
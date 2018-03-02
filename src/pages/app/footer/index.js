import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';
import { Layout } from 'antd';
import {systemName} from 'utils/config';

const { Footer } = Layout;

const Foot =  (props) => {
  const {theme, children, ...other} = props;

  const styleTheme = theme ? theme : 'default'; 
  const classNameStyle = classnames('footer', {
    [`footer-${styleTheme}`]: true
  });

  return (
    <Footer className={classNameStyle} {...other}>
      {children}
      <footer>Copyright©2017 {systemName} Corporation All Rights Reserved</footer>
    </Footer>
  );
};

Foot.propTypes = {
	// 主题，dark/light/default
	theme: PropTypes.string
};

export default Foot;


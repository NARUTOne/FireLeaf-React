import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Layout } from 'antd';
import {systemName} from 'utils/config';

const { Footer } = Layout;

const AFooter =  (props) => {
  const {theme, children, ...other} = props;

  const styleTheme = theme ? theme : 'default'; 
  const classNameStyle = classnames('footer', {
    [`footer-${styleTheme}`]: true
  });

  return (
    <Footer className={classNameStyle} {...other}>
      {children}
      <footer>Copyright©{new Date().getFullYear()} {systemName} Corporation All Rights Reserved</footer>
    </Footer>
  );
};

AFooter.propTypes = {
	// 主题，dark/light/default
	theme: PropTypes.string
};

export default AFooter;


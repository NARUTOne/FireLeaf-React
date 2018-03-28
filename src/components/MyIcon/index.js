import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';

const IconFont = props => {
  const { className, type, ...other } = props;
  return (
    <i className={classnames('iconfont', 'icon-' + type, className)} {...other}></i>
  );
};

IconFont.propTypes = {
  // 图标类型，http://iconfont.cn
  type: PropTypes.string.isRequired
};

export default IconFont;
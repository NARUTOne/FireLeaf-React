import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';


export default (props) => {
  return (
    <div className="app-logo">
      <Link to='/' className={classnames('logo', {"logo-max": !props.collapsed, 'logo-min': !!props.collapsed, 'hide': !!props.hideLogo})}>
        {props.children || null}
      </Link>
    </div>
  );
};

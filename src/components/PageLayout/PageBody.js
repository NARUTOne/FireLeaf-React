import React from 'react';

export default (props) => {
  const {children} = props;
  delete props.children;
  return (
    <div className="page-layout-body" {...props}>
      {children}
    </div>
  );
};

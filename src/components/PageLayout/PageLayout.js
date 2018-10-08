import React from 'react';

export default (props) => {
  const {children} = props;
  delete props.children;
  return (
    <div className="page-layout" {...props}>
      {children}
    </div>
  );
};

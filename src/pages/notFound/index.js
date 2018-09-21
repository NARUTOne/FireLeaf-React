import React from 'react';

const NotFound = (props) => {
  const {children} = props;
  return (
    <div className="not-found">
      <h1>
        404
      </h1>
      <p className='warn-color not-dev-info'>您访问的页面暂未开发，敬请期待&nbsp;</p>
      <p>{children}</p>
    </div>
  );
};
export default NotFound;

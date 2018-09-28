import React from 'react';
import {Spin, Alert, Skeleton} from 'antd';

const LoadingPage = ({ isLoading, error }) => {
  // Handle the loading state
  // console.log(isLoading, error);
  if (isLoading) {
      return <div className="loading-page">
        <div className="loading-body">
          <Spin size="large" tip="loading">
            <Skeleton avatar paragraph={{ rows: 6 }} />
          </Spin>
        </div>
      </div>;
  }
  // Handle the error state Sorry, there was a problem loading the page.
  else if (error) {
      return <div className="loading-page loading-error">
        <div className="loading-body">
          <Alert 
            showIcon
            type="warning"
            message="加载错误"
            description="加载的页面中含有错误！"
          ></Alert>
        </div>
      </div>;
  }
  else {
    return null;
  }
};


export default LoadingPage;
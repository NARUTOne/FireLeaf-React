import React from 'react';

const LoadingPage = ({ isLoading, error }) => {
  // Handle the loading state
  // console.log(isLoading, error);
  if (isLoading) {
      return <div className="loading-page">Loading...</div>;
  }
  // Handle the error state
  else if (error) {
      return <div className="loading-page-error">Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};


export default LoadingPage;
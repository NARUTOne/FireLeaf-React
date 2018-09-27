import xhr from './xhr';
import {message} from 'antd';
import auth from './auth';
import {apiBaseUrl} from './config';
import newHistory from './history';

let apiUrl = '';

xhr.getUrl = option => {
  if (option.baseUrl) {
    apiUrl = option.baseUrl + option.url;
    return {
      baseUrl: option.baseUrl,
      url: option.url
    };
  }
  apiUrl = apiBaseUrl + option.url;
  return {
    baseUrl: apiBaseUrl,
    url: option.url
  };
};

xhr.baseData = {
  t: Date.now()
};

xhr.success = (response) => {
  const res = response;
  let isSuccess = true;

  if (typeof res !== 'object') {
    message.error(apiUrl + ': response data should be JSON');
    isSuccess = false;
  }
  switch (res.code + '') {
    case '200':
      isSuccess = true;
      break;
    case '401':
      auth.destroy();
      newHistory.push('/login');
      isSuccess = false;
      break;
    default:
      message.error(res.msg || 'unknown error');
      isSuccess = false;
  }

  return isSuccess;
};

xhr.error = (err) => {
  message.error('服务器开小差了！');
  return err;
};

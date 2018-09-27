/**
 * xhr for login
 */

import xhr from 'utils/xhr';

export function toLoginXHR (data) {
  // console.log(data);
  return new Promise((resolve, reject) => {
    xhr({
      url: 'api/login',
      type: 'POST',
      data,
      success: res => {
        resolve(res);
      },
      error: err => {
        reject(err);
      }
    });
  });
}

export function toLogoutXHR () {
  return new Promise((resolve, reject) => { 
    xhr({
      url: 'api/logout',
      type: 'GET',
      success: res => {
        resolve(res);
      },
      error: err => {
        reject(err);
      }
    });
  });
}

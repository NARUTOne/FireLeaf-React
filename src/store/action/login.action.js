/**
 * action login
 */

import * as types from '../types';

export function toLogin (params, dispatch) {
  dispatch({
    type: types.TO_LOGIN,
    params
  });
}

export function loginError (err) {
  return {
    type: types.LOGIN_ERROR,
    err
  };
}

export function refreshLogin (data) {
  return {
    type: types.LOGIN_REFRESH,
    data
  };
}


export function toLogout (params, dispatch) {
  dispatch({
    type: types.TO_LOGOUT,
    params
  });
}

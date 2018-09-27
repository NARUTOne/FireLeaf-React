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

export function toLogout (params, dispatch) {
  dispatch({
    type: types.TO_LOGOUT,
    params
  });
}

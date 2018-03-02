/**
 * action login
 */

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function loginPending () {
  return {
    type: LOGIN_PENDING
  };
}

export function loginSuccess (data) {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginError (err) {
  return {
    type: LOGIN_ERROR,
    err
  };
}

export function logoutSuccess (msg) {
  return {
    type: LOGOUT_SUCCESS,
    msg
  };
}
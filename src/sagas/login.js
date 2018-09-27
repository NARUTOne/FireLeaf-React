import {delay} from 'redux-saga';
import {take, put, call} from 'redux-saga/effects';
import {toLoginXHR, toLogoutXHR} from '@/api/login';
import * as types from '../store/types';

const {
  TO_LOGIN,
  TO_LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} = types;

function * toLogin () {
  yield delay(2000);
  const toLoginAction = yield take(TO_LOGIN);
  const toLoginPromise = yield call (toLoginXHR, toLoginAction.params);

  toLoginPromise.then(function * (res) {
    yield put({
      type: LOGIN_SUCCESS,
      data: res.data
    });
  }).catch( function * (err) {
    yield put({
      type: LOGIN_ERROR,
      data: err
    });
  });
}

function * toLogout () {
  yield delay(2000);
  const toLogoutAction = yield take(TO_LOGOUT);
  const toLogoutPromise = yield call (toLogoutXHR, toLogoutAction.params);

  toLogoutPromise.then(function * (res) {
    yield put({
      type: LOGOUT_SUCCESS,
      data: res.data
    });
  }).catch( function * (err) {
    yield put({
      type: LOGIN_ERROR,
      data: err
    });
  });
}

export default {
  toLogin,
  toLogout
};

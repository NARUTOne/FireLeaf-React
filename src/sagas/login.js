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
  const toLoginRes = yield call (toLoginXHR, toLoginAction.params);
  // console.log(toLoginPromise);

  if (toLoginRes.success) {
    yield put({
      type: LOGIN_SUCCESS,
      data: toLoginRes.data
    });
  } else {
    yield put({
      type: LOGIN_ERROR,
      data: toLoginRes
    });
  }
}

function * toLogout () {
  yield delay(2000);
  const toLogoutAction = yield take(TO_LOGOUT);
  const res = yield call (toLogoutXHR, toLogoutAction.params);
  // console.log(toLogoutPromise);
  if (res.success) {
    yield put({
      type: LOGOUT_SUCCESS,
      data: res
    });
  } else {
    yield put({
      type: LOGIN_ERROR,
      data: res
    });
  }
}

export {
  toLogin,
  toLogout
};

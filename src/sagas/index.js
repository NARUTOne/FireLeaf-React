/**
 * redux sagas
 */

import {all, fork} from 'redux-saga/effects';

import {toLogin, toLogout} from './login';

export default function * rootSaga () {
  yield all([
    fork(toLogin),
    fork(toLogout)
  ]);
}

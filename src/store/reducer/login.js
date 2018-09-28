/**
 * reducer login
 */
import auth from '@/utils/auth';
import * as types from '../types';
import {message} from 'antd';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_REFRESH
} = types;

const initialState = {
  user: null,
  isLogin: false
};

export default function login (state = initialState, action={}) {
  const {msg} = action.data || {};
  switch (action.type) {
    case LOGIN_SUCCESS:
      auth.register(action.data);
      return Object.assign({}, state, {user: action.data, isLogin: true});
    case LOGIN_REFRESH:
      return {...state, user: action.data, isLogin: true};
    case LOGIN_ERROR:
      message.error(action.err, 3);
      return {
        ...state,
        user: null,
        isLogin: false
      };
    case LOGOUT_SUCCESS:
      auth.destroy();
      message.info(msg, 3);
      return {
        ...state,
        user: null,
        isLogin: false
      };
    default:
      return state;
  }
}
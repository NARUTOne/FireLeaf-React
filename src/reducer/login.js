/**
 * reducer login
 */
import auth from 'src/utils/auth';
import { loginAction } from 'src/action/';
import {message} from 'antd';

const {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} = loginAction;

const initialState = {
  user: null,
  isLogin: false,
  isLoggingIn: false
};

export default function login (state = initialState, action={}) {
  switch (action.type) {
    case LOGIN_PENDING:
      return Object.assign({}, initialState, {isLoggingIn: true});
    case LOGIN_SUCCESS:
      auth.register(action.data);
      return Object.assign({}, state, {user: action.data, isLogin: true, isLoggingIn: false});
    case LOGIN_ERROR:
      message.error(action.err, 3);
      return {
        ...state,
        user: null,
        isLogin: false,
        isLoggingIn: true
      };
    case LOGOUT_SUCCESS:
      auth.destroy();
      message.info(action.msg, 3);
      return {
        ...state,
        user: null,
        isLogin: false,
        isLoggingIn: false
      };
    default:
      return state;
  }
}
import {userConstants} from './../actions/actionTypes'

const initialState = {
  status: 'idle',
  loggedIn: false,
  login: '',
  loginRequestStatus: 'idle',
  error: false
}
const login = (state = initialState, {type, payload}) => {
  switch (type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        status: 'succedded',
        login: getLoginFromEmail(payload.email),
        loggedIn: true,
        error: false,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        status: 'failed',
        loggedIn: false,
        error: payload,
      };
    case userConstants.GETUSERINFO_REQUEST:
      return {
        ...state,
        loginRequestStatus: 'loading',
      };
    case userConstants.GETUSERINFO_SUCCESS:
      return {
        ...state,
        login: getLoginFromEmail(payload),
        loginRequestStatus: 'succedded',
      };
    case userConstants.GETUSERINFO_SUCCESS:
      return {
        ...state,
        loginRequestStatus: 'failed'
      }
    case userConstants.LOGOUT:
      return {
        ...state,
        status: 'succedded',
        login: '',
        loggedIn: false,
      };
    default:
      return state;
  }
}

const getLoginFromEmail = (email) => email.slice(0, email.indexOf('@'));

export default login;

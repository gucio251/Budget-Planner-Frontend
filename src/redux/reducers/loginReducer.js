import {userConstants} from './../actions/actionTypes'

<<<<<<< HEAD
export default function login(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        logginIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem('token', action.user.token)
      return {
          loggedIn: true,
          email: action.user.email
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        errorMsg: action.error
      };
    case userConstants.LOGIN_ERROR:
      return {
        loggedIn: false,
        errorMsg: action.error
=======
const initialState = {
  status: 'idle',
  loggedIn: false,
  error: false
}
const login = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        status: 'loading'
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem('token', payload)
      return {
        ...state,
        status: 'succedded',
        loggedIn: true,
        error: false
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        status: 'failed',
        loggedIn: false,
        error: payload
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
      };
    default:
      return state;
  }
<<<<<<< HEAD
}
=======
}

export default login;
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2

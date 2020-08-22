import {userConstants} from './../actions/actionTypes'

export default function login(state = {"loggedIn": false}, action) {
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
    default:
      return state;
  }
}
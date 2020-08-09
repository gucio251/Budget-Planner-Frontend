import {userConstants} from './../actions/actionTypes'

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
      return {};
    default:
      return state;
  }
}
import {userConstants} from './../actions/actionTypes'

const login = (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
      ...state,
      logginIn: true,
      user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      const key = 'errorMsg';
      const {[key]: err, ...oldState} = state;
      localStorage.setItem('token', action.user.token)
      return {
        ...oldState,
        loggedIn: true,
        logginIn: false,
        email: action.user.email,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        logginIn: false,
        errorMsg: action.error
      };
    default:
      return state;
  }
}

export default login;
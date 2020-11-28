import {userConstants} from './../actions/actionTypes'

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
      };
    default:
      return state;
  }
}

export default login;
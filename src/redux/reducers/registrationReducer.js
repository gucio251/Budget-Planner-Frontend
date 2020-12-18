import {userConstants} from '../actions/actionTypes';

const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        registeredIn: false,
        errorMsg: action.error
      };
    default:
      return state;
  }
}

export default registration;

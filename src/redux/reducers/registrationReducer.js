import {userConstants} from '../actions/actionTypes';

<<<<<<< HEAD
export default function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
=======
const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
        registering: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {
<<<<<<< HEAD
=======
        ...state,
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
        registeredIn: false,
        errorMsg: action.error
      };
    default:
      return state;
  }
<<<<<<< HEAD
}
=======
}

export default registration;
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2

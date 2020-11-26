import {userConstants} from "../actions/actionTypes";

const users = (state = [], action) => {
  switch (action.type) {
    case userConstants.GETUSERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETUSERS_SUCCESS:
      return {
        ...state,
        emails: action.users,
        loading: false
      }
    case userConstants.GETUSERS_FAILURE:
      const errorMsg =  action.error ? "Unable to connect to the database" : "";
      return {...state,
        errorMsg: errorMsg,
        loading: false
        };
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        addingUser:true,
      }
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        addingUser: false,
        emails: [].concat(state.emails, action.user.email)
      }
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        addingUser: false,
        errorMsg: action.error
      }
    default:
      return state;
  }
}

export default users;

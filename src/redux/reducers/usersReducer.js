import {userConstants} from "../actions/actionTypes";

const users = (state = [], action) => {
  switch (action.type) {
    case userConstants.GETUSERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETUSERS_SUCCESS:
      return {...state,
              emails: action.users,
              loading: false
            }
    case userConstants.GETUSERS_FAILURE:
      const errorMsg =  action.error ? "Unable to connect to the database" : "";
      return {...state,
              errorMsg: errorMsg,
              loading: false
        };
    default:
      return state;
  }
}

export default users;

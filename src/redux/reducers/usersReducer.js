import {userConstants} from "../actions/actionTypes";

export default function users(state = [], action) {
  switch (action.type) {
    case userConstants.GETUSERS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERS_SUCCESS:
      return [...action.users];
    case userConstants.GETUSERS_FAILURE:
      const errorMsg =  action.error ? "Unable to connect to the database" : "";
      return {
          errorMsg: errorMsg
        };
    default:
      return state;
  }
}

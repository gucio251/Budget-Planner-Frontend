import {userConstants} from "../actions/actionTypes";

<<<<<<< HEAD
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
=======
const initialState = {
  status: 'idle',
  emails: [],
  errorMsg: false,
}

const users = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case userConstants.GETUSERS_REQUEST:
      return {
        ...state,
        status: 'loading'
      };
    case userConstants.GETUSERS_SUCCESS:
      return {
        ...state,
        emails: payload,
        status: 'succedded'
      }
    case userConstants.GETUSERS_FAILURE:
      const errorMsg =  payload ? "Unable to connect to the database" : "";
      return {
        ...state,
        errorMsg: errorMsg,
        status: 'failed'
      };
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        status:'adding',
      }
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        emails: [].concat(state.emails, payload),
        status: 'succedded'
      }
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        status: 'failed',
        errorMsg: payload
      }
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
    default:
      return state;
  }
}
<<<<<<< HEAD
=======

export default users;
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2

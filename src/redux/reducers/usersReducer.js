import {userConstants} from "../actions/actionTypes";

const initialState = {
  status: 'idle',
  emails: [],
  error: false,
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
    default:
      return state;
  }
}

export default users;

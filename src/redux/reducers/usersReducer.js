import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return { ...state, registeredUsers: action.users };
    case types.CREATE_USER_SUCCESS:
      const newRegisteredUsers = [...state.registeredUsers];
      newRegisteredUsers.push(action.user);
      return { ...state, registeredUsers: newRegisteredUsers};
    default:
      return state;
  }
}

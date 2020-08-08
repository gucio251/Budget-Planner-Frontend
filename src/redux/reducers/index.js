import { combineReducers } from "redux";
import users from './usersReducer';
import registration from './registrationReducer';

const rootReducer = combineReducers({
  users,
  registration
});

export default rootReducer;

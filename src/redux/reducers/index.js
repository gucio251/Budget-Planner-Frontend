import { combineReducers } from "redux";
import users from './usersReducer';
import registration from './registrationReducer';
import login from './loginReducer'

const rootReducer = combineReducers({
  users,
  registration,
  login
});

export default rootReducer;

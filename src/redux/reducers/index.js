import { combineReducers } from "redux";
import users from './usersReducer';
import registration from './registrationReducer';
import login from './loginReducer'
<<<<<<< HEAD

const rootReducer = combineReducers({
  users,
  registration,
  login
=======
import expenseTypes from './expenseTypesReducer'
import incomeTypes from './incomeTypesReducer'
import currencies from './currencyReducer'
import incomes from './incomesReducer'
import expenses from './expensesReducer'
import datesRange from './datesRangeReducer'

const rootReducer = combineReducers({
  users,
  incomes,
  registration,
  login,
  expenseTypes,
  incomeTypes,
  currencies,
  expenses,
  datesRange,
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
});

export default rootReducer;

import { combineReducers } from "redux";
import users from './usersReducer';
import registration from './registrationReducer';
import login from './loginReducer'
import expenseTypes from './expenseTypesReducer'
import incomeTypes from './incomeTypesReducer'
import currencies from './currencyReducer'
import incomes from './incomesReducer'
import expenses from './expensesReducer'
import datesRange from './datesRangeReducer'
import filtration from './filtrationReducer';

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
  filtration,
});

export default rootReducer;

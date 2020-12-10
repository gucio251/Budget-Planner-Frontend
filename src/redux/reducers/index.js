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
import filteredTransactions from './filteredTransactionsReducer';

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
  filteredTransactions,
});

export default rootReducer;

import { combineReducers } from "redux";
import users from 'redux/reducers/usersReducer';
import registration from 'redux/reducers/registrationReducer';
import login from 'redux/reducers/loginReducer'
import expenseTypes from 'redux/reducers/expenseTypesReducer'
import incomeTypes from 'redux/reducers/incomeTypesReducer'
import currencies from 'redux/reducers/currencyReducer'
import incomes from 'redux/reducers/incomesReducer'
import expenses from 'redux/reducers/expensesReducer'
import datesRange from 'redux/reducers/datesRangeReducer';
import filtration from 'redux/reducers/filtrationReducer';
import mobileView from 'redux/reducers/mobileViewReducer';

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
  mobileView
});

export default rootReducer;

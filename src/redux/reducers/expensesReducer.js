import { expensesConstants } from './../actions/actionTypes';
import {expenseTypeSvgCorrelation} from 'Utils/svgCorrelation';
import {handleSvgAddition, addPropertyLoListOfObjects} from 'Utils/functions';

const initialState = {
  status: 'idle',
  expenses: [],
  error: false,
};

const expenses = (state = initialState, {type, payload}) => {
  switch (type) {
    case expensesConstants.GETEXPENSES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case expensesConstants.GETEXPENSES_SUCCESS:
      const expensesWithSvg = handleSvgAddition(
        payload,
        'category',
        expenseTypeSvgCorrelation
      );
      const finalExpenses = addPropertyLoListOfObjects(
        'type',
        'expense',
        expensesWithSvg
      );
      return {
        ...state,
        status: 'succedded',
        expenses: [...finalExpenses],
      };
    case expensesConstants.GETEXPENSES_FAILURE:
      return {
        ...state,
        status: 'failed',
        errorMsg: payload,
      };
    case expensesConstants.ADDEXPENSE_REQUEST:
      return {
        ...state,
      };
    case expensesConstants.ADDEXPENSE_SUCCESS:
      return {
        ...state,
        expenses: [].concat(state.expenses, {...payload, type: 'expense'}),
        status: 'succedded',
      };
    case expensesConstants.DELETEEXPENSE_SUCCESS:
      return {
        ...state,
        status: 'succedded',
        expenses: state.expenses.filter((expense) => {
          return parseInt(expense.id) !== parseInt(payload);
        }),
        currentlyModifiedObjectId: null
      };
    case expensesConstants.UPDATEEXPENSE_REQUEST:
      return {
        ...state,
      };
    case expensesConstants.UPDATEEXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === payload.id) {
            return payload;
          } else {
            return expense;
          }
        }),
      };
    case expensesConstants.SETMODIFIEDEXPENSEID:
      return {
        ...state,
        currentlyModifiedObjectId: payload
      };
    default:
      return state;
  }
};

export default expenses;

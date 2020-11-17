import { expensesConstants } from './../actions/actionTypes';
import {expenseTypeSvgCorrelation} from 'Utils/svgCorrelation';
import {handleSvgAddition, addPropertyLoListOfObjects, convertDateToString} from 'Utils/functions';

const expenses = (state = {expenses:[]}, action) => {
  switch (action.type) {
    case expensesConstants.GETEXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case expensesConstants.GETEXPENSES_SUCCESS:
      const expensesWithSvg = handleSvgAddition(action.expenses, "category", expenseTypeSvgCorrelation);
      const finalExpenses = addPropertyLoListOfObjects(
        'type',
        'expense',
        expensesWithSvg
      );
      return {
        ...state,
        loading: false,
        expenses: [...finalExpenses],
      };
    case expensesConstants.GETEXPENSES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.error,
      };
    case expensesConstants.ADDEXPENSE_REQUEST:
      return {
        ...state,
        adding: true,
      };
    case expensesConstants.ADDEXPENSE_SUCCESS:
        const date = convertDateToString(action.expense.transaction_date);
        const expense = {...action.expense, transaction_date: date}
        const expenseWithSvg = handleSvgAddition(expense, "category", expenseTypeSvgCorrelation);
        return {
          ...state,
          expenses: [].concat(state.expenses, expenseWithSvg),
          adding: false,
        };
    case expensesConstants.DELETEEXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.filter(expense => {
          return parseInt(expense.id) !== parseInt(action.expenseId)
        })
      }
    default:
      return state;
  }
};

export default expenses;

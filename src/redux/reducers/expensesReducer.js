import { expensesConstants } from './../actions/actionTypes';

const initialState = {
  status: 'idle',
  expenses: {},
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
      return {
        ...state,
        status: 'succedded',
        expenses: payload,
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
        expenses: {
          ...state.expenses,
          [payload.id]: { ...payload },
        },
        status: 'succedded',
      };
    case expensesConstants.DELETEEXPENSE_SUCCESS:
      const objectCopy = {...state.expenses}
      delete objectCopy[payload];
      return {
        ...state,
        status: 'succedded',
        expenses: objectCopy,
      };
    case expensesConstants.UPDATEEXPENSE_REQUEST:
      return {
        ...state,
      };
    case expensesConstants.UPDATEEXPENSE_SUCCESS:
      const expensesCopy = {...state.expenses};
      return {
        ...state,
        expenses: {
          ...expensesCopy,
          [payload.id]: {...payload}
        }
      };
    default:
      return state;
  }
};

export default expenses;

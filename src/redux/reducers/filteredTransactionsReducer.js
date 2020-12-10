import { filteredTransactionsConstants } from './../actions/actionTypes';

const initialState = {
  status: 'idle',
  transactions: [],
  datesRange: {
      start: '',
      end: ''
  },
  error: false,
};

const filteredTransactions = (state = initialState, {type, payload}) => {
  switch (type) {
    case filteredTransactionsConstants.FILTEREDTRANSACTIONS_LOAD:
      return {
        ...state,
        status: 'succedded',
        transactions: payload.transactions,
        datesRange: payload.datesRange
      };
    default:
      return state;
  }
};

export default filteredTransactions;

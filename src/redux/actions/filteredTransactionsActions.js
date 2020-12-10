import { filteredTransactionsConstants } from 'redux/actions/actionTypes';

const load = (transactions) => (dispatch) => {
    const success = (transactions) => {
        return { type: filteredTransactionsConstants.FILTEREDTRANSACTIONS_LOAD, payload: transactions };
    };

    dispatch(success(transactions));
};

export const filteredTransactions = {
  load,
};

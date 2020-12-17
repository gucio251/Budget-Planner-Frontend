import { expensesConstants, filteredTransactionsConstants } from 'redux/actions/actionTypes';
import * as expensesApi from 'api/expensesApi';

const load = (token) => (dispatch) => {
  const request = () => {
    return { type: expensesConstants.GETEXPENSES_REQUEST};
  };
  const success = (expenses) => {
    return { type: expensesConstants.GETEXPENSES_SUCCESS, payload: expenses };
  };
  const failure = (error) => {
    return { type: expensesConstants.GETEXPENSES_FAILURE, payload: error };
  };


  dispatch(request());

  expensesApi.load(token).then(
    ({ result }) => {
      dispatch(success(result));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const add = (expense) => (dispatch) => {
    const request = () => {
    return { type: expensesConstants.ADDEXPENSE_REQUEST };
    };
    const success = (payload) => {
    return { type: expensesConstants.ADDEXPENSE_SUCCESS, payload };
    };
    const failure = (payload) => {
      return { type: expensesConstants.ADDEXPENSE_FAILURE, payload };
    };

    dispatch(request());

    const token = localStorage.getItem('token');

    expensesApi.save(token, expense).then(
        ({insertId}) => {
            const payload = { ...expense, id: insertId };
            dispatch(success(payload))
        },
        (error)=> {
            dispatch(failure(error))
        }
    )

}

const update = (expense) => (dispatch) => {
  debugger;
  const request = () => {
    return { type: expensesConstants.UPDATEEXPENSE_REQUEST };
  };
  const success = (payload) => {
    return { type: expensesConstants.UPDATEEXPENSE_SUCCESS, payload };
  };
  const failure = (payload) => {
    return { type: expensesConstants.UPDATEEXPENSE_FAILURE, payload };
  };

  dispatch(request());

  const token = localStorage.getItem('token');

  expensesApi.save(token, expense).then(
    (result) => {
      dispatch(success(expense));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const deleteSingle = (token, expenseId) => (dispatch) => {
      const request = () => {
        return { type: expensesConstants.DELETEEXPENSE_REQUEST };
      };
      const success = (payload) => {
        return { type: expensesConstants.DELETEEXPENSE_SUCCESS, payload };
      };
      const failure = (payload) => {
        return { type: expensesConstants.DELETEEXPENSE_FAILURE, payload };
      };

      dispatch(request());

      expensesApi.deleteSingle(token, expenseId).then(
        ({id}) => {
          dispatch(success(id));
        },
        (error) => {
          dispatch(failure(error));
        }
      );

}

export const expensesActions = {
  load,
  add,
  update,
  deleteSingle
};

import { expensesConstants } from 'redux/actions/actionTypes';
import {Expenses} from 'api/services/API'

const load = () => (dispatch) => {
  const request = () => {
    return { type: expensesConstants.GETEXPENSES_REQUEST};
  };
  const success = (payload) => {
    return { type: expensesConstants.GETEXPENSES_SUCCESS, payload };
  };
  const failure = (error) => {
    return { type: expensesConstants.GETEXPENSES_FAILURE, payload: error };
  };


  dispatch(request());

  Expenses.index().then(
    ({ result }) => {
      dispatch(success(result[0].expenses));
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

    Expenses.create(expense).then(
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
  const request = () => {
    return { type: expensesConstants.UPDATEEXPENSE_REQUEST };
  };
  const success = (payload) => {
    return { type: expensesConstants.UPDATEEXPENSE_SUCCESS, payload };
  };
  const failure = (error) => {
    return { type: expensesConstants.UPDATEEXPENSE_FAILURE, error };
  };

  dispatch(request());

  Expenses.update(expense).then(
    (result) => {
      dispatch(success(expense));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const deleteSingle = (expenseId) => (dispatch) => {
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

      Expenses.remove(expenseId).then(
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

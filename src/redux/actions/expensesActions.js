import { expensesConstants } from 'redux/actions/actionTypes';
import * as expensesApi from 'api/expensesApi';

const load = (token) => (dispatch) => {
  const request = () => {
    return { type: expensesConstants.GETEXPENSES_REQUEST};
  };
  const success = (expenses) => {
    return { type: expensesConstants.GETEXPENSES_SUCCESS, expenses };
  };
  const failure = (error) => {
    return { type: expensesConstants.GETEXPENSES_FAILURE, error };
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

const add = (token, expense) => (dispatch) => {
    const request = () => {
    return { type: expensesConstants.ADDEXPENSE_REQUEST };
    };
    const success = (expense) => {
    return { type: expensesConstants.ADDEXPENSE_SUCCESS, expense };
    };
    const failure = (error) => {
    return { type: expensesConstants.ADDEXPENSE_FAILURE, error };
    };

    dispatch(request());

    expensesApi.save(token, expense).then(
        ({insertId}) => {
            dispatch(success({...expense, id: insertId}))
        },
        (error)=> {
            dispatch(failure(error))
        }
    )

}

export const expensesActions = {
  load,
  add
};

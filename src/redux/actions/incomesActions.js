import { incomesConstants } from 'redux/actions/actionTypes';
import * as incomesApi from 'api/incomesApi';

const load = (token) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.GETINCOMES_REQUEST };
  };
  const success = (incomes) => {
    return { type: incomesConstants.GETINCOMES_SUCCESS, incomes };
  };
  const failure = (error) => {
    return { type: incomesConstants.GETINCOMES_FAILURE, error };
  };

  dispatch(request());

  incomesApi.load(token).then(
    ({results}) => {
      console.log(results);
      dispatch(success(results));
    },
    (error) => {
      console.log(error)
      dispatch(failure(error));
    }
  );
};

const add = (token, income) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.ADDINCOME_REQUEST };
  };
  const success = (income) => {
    return { type: incomesConstants.ADDINCOME_SUCCESS, income };
  };
  const failure = (error) => {
    return { type: incomesConstants.ADDINCOME_FAILURE, error };
  };

  dispatch(request());

  incomesApi.save(token, income).then(
    ({id}) => {
      dispatch(success({ ...income, id: id }));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const update = (token, income) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.UPDATEINCOME_REQUEST };
  };
  const success = (income) => {
    return { type: incomesConstants.UPDATEINCOME_SUCCESS, income };
  };
  const failure = (error) => {
    return { type: incomesConstants.UPDATEINCOME_FAILURE, error };
  };

  dispatch(request());

  incomesApi.save(token, income).then(
    (result) => {
      dispatch(success(income));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const deleteSingle = (token, incomeId) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.DELETEINCOME_REQUEST };
  };
  const success = (incomeId) => {
    return { type: incomesConstants.DELETEINCOME_SUCCESS, incomeId };
  };
  const failure = (error) => {
    return { type: incomesConstants.DELETEINCOME_FAILURE, error };
  };

  dispatch(request());

  incomesApi.deleteSingle(token, incomeId).then(
    ({ id }) => {
      dispatch(success(id));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

export const incomesActions = {
  load,
  add,
  deleteSingle,
  update,
};

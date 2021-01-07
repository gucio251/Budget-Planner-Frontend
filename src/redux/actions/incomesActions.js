import { incomesConstants } from 'redux/actions/actionTypes';
import {Incomes} from 'api/services/API'

const load = () => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.GETINCOMES_REQUEST };
  };
  const success = (payload) => {
    return { type: incomesConstants.GETINCOMES_SUCCESS, payload };
  };
  const failure = (payload) => {
    return { type: incomesConstants.GETINCOMES_FAILURE, payload };
  };

  dispatch(request());

  Incomes.index().then(
    ({results}) => {
      dispatch(success(results));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const add = (income) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.ADDINCOME_REQUEST };
  };
  const success = (payload) => {
    return { type: incomesConstants.ADDINCOME_SUCCESS, payload };
  };
  const failure = (payload) => {
    return { type: incomesConstants.ADDINCOME_FAILURE, payload };
  };

  dispatch(request());

  Incomes.create(income).then(
    ({id}) => {
      dispatch(success({ ...income, id: id }));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const update = (income) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.UPDATEINCOME_REQUEST };
  };
  const success = (payload) => {
    return { type: incomesConstants.UPDATEINCOME_SUCCESS, payload };
  };
  const failure = (error) => {
    return { type: incomesConstants.UPDATEINCOME_FAILURE, error };
  };

  dispatch(request());

  Incomes.update(income).then(
    (result) => {
      dispatch(success(income));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const deleteSingle = (incomeId) => (dispatch) => {
  const request = () => {
    return { type: incomesConstants.DELETEINCOME_REQUEST };
  };
  const success = (payload) => {
    return { type: incomesConstants.DELETEINCOME_SUCCESS, payload };
  };
  const failure = (error) => {
    return { type: incomesConstants.DELETEINCOME_FAILURE, error };
  };

  dispatch(request());

  Incomes.remove(incomeId).then(
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

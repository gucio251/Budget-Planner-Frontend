import { datesRangeConstants } from 'redux/actions/actionTypes';

const setDateRange = (datesRange) => (dispatch) => {
  const request = () => {
    return { type: datesRangeConstants.SETDATESRANGE_REQUEST };
  };
  const success = (datesRange) => {
    return { type: datesRangeConstants.SETDATESRANGE_SUCCESS, payload: datesRange };
  };
  const failure = (error) => {
    return { type: datesRangeConstants.SETDATESRANGE_FAILURE, payload: error };
  };

  dispatch(request());

  const {start, end} = datesRange;

  if((start instanceof Date) === false || (end instanceof Date)  === false){
      dispatch(failure(new Error('Date is in wrong format')))
  }

  dispatch(success(datesRange));
};

export const datesRangeActions = {
  setDateRange,
};

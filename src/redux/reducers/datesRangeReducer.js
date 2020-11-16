import { datesRangeConstants } from './../actions/actionTypes';

const datesRange = (state = {}, action) => {
  switch (action.type) {
    case datesRangeConstants.SETDATESRANGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case datesRangeConstants.SETDATESRANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        datesRange: action.datesRange,
      };
    case datesRangeConstants.SETDATESRANGE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.error,
      };
    default:
      return state;
  }
};

export default datesRange;

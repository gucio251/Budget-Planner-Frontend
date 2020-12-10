import { datesRangeConstants } from './../actions/actionTypes';

const initialState = {
  status: 'idle',
  datesRange: {
    start: '',
    end: '',
  },
  prevRange: {
    start: '',
    end: '',
  },
  error: false,
};

const datesRange = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case datesRangeConstants.SETDATESRANGE_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case datesRangeConstants.SETDATESRANGE_SUCCESS:
      return {
        ...state,
        status: 'succedded',
        datesRange: payload,
        prevRange: state.datesRange,
      };
    case datesRangeConstants.SETDATESRANGE_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: payload,
      };
    default:
      return state;
  }
};

export default datesRange;

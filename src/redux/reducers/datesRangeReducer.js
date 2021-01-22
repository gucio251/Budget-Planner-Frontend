import { datesRangeConstants } from './../actions/actionTypes';
import { calculateMonthBeginningAndEnd } from 'components/DatesRangeMenu/DatesRangeMenu';

const initialState = {
  datesRange: {
    ...calculateMonthBeginningAndEnd(),
    option: 'This Month'
  },
  prevRange: {
    start: '',
    end: '',
  },
  error: false,
};

const datesRange = (state = initialState, {type, payload}) => {
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

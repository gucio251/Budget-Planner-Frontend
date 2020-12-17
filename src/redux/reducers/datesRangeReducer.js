import { datesRangeConstants } from './../actions/actionTypes';
import { returnDatesRangeForGivenMonth } from 'containers/DatesRangeContainer'

const getDates = () => {
    const today = new Date();
    const [start, end] = returnDatesRangeForGivenMonth(today.getMonth());
    return {
      start,
      end
    }
}

const initialState = {
  status: 'idle',
  datesRange: getDates(),
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

import { incomeTypesConstants } from './../actions/actionTypes';
import { addSvg } from 'Utils/functions';
import { incomeTypeSvgCorrelation } from 'Utils/svgCorrelation';

const initialState = {
  status: 'idle',
  incomeTypes: [],
  error: false,
}

const incomeTypes = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case incomeTypesConstants.GETINCOMETYPES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case incomeTypesConstants.GETINCOMETYPES_SUCCESS:
      const payloadWithSvg = addSvg(payload, incomeTypeSvgCorrelation);
      return {
        ...state,
        status: 'succedded',
        incomeTypes: payloadWithSvg,
      };
    case incomeTypesConstants.GETINCOMETYPES_FAILURE:
      return {
        ...state,
        status: 'failed',
        errorMsg: payload,
      };
    default:
      return state;
  }
};

export default incomeTypes;

import { incomeTypesConstants } from './../actions/actionTypes';
import { incomeTypeSvgCorrelation } from 'Utils/svgCorrelation';
import { restructureInputData } from './expenseTypesReducer';

const initialState = {
  status: 'idle',
  incomeTypes: [],
  error: false,
}

const incomeTypes = (state = initialState, {type, payload}) => {
  switch (type) {
    case incomeTypesConstants.GETINCOMETYPES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case incomeTypesConstants.GETINCOMETYPES_SUCCESS:
      const restructuredData = restructureInputData(
        payload,
        incomeTypeSvgCorrelation
      );
      return {
        ...state,
        status: 'succedded',
        incomeTypes: {
          ...restructuredData,
        },
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

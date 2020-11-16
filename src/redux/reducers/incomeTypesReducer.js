import { incomeTypesConstants } from './../actions/actionTypes';
import { addSvg } from 'Utils/functions';
import { incomeTypeSvgCorrelation } from 'Utils/svgCorrelation';

const incomeTypes = (state = {}, action) => {
  switch (action.type) {
    case incomeTypesConstants.GETINCOMETYPES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case incomeTypesConstants.GETINCOMETYPES_SUCCESS:
      const incomesWithSVG = addSvg(
        action.incomes,
        incomeTypeSvgCorrelation
      );
      return {
        ...state,
        loading: false,
        incomeTypes: incomesWithSVG,
      };
    case incomeTypesConstants.GETINCOMETYPES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.error,
      };
    default:
      return state;
  }
};

export default incomeTypes;

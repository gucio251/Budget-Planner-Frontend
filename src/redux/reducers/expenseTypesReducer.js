import {expenseTypesConstants} from './../actions/actionTypes';
import {addSvg} from 'Utils/functions';
import {expenseTypeSvgCorrelation} from 'Utils/svgCorrelation';

const expenseTypes = (state = {}, action) => {
  switch (action.type) {
    case expenseTypesConstants.GETEXPENSETYPES_REQUEST:
      return {
      ...state,
      loading: true
      };
    case expenseTypesConstants.GETEXPENSETYPES_SUCCESS:
      const expensesWithSVG = addSvg(action.expenseTypes, expenseTypeSvgCorrelation);
      return {
        ...state,
        loading: false,
        expenseTypes: expensesWithSVG,
      };
    case expenseTypesConstants.GETEXPENSETYPES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.error
      };
    default:
      return state;
  }
}

export default expenseTypes;
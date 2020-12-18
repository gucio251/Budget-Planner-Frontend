import { incomeTypesConstants } from './../actions/actionTypes';
import { addSvg } from 'Utils/functions';
import { incomeTypeSvgCorrelation } from 'Utils/svgCorrelation';
import { normalizePack, addSvgToData } from './expenseTypesReducer';
import { normalize } from 'normalizr';

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
      const normalizedData = normalize({categories: payload}, { categories: [normalizePack.category]});
      const normalizedCategoriesWithSvg = addSvgToData(normalizedData, incomeTypeSvgCorrelation);
      return {
        ...state,
        status: 'succedded',
        incomeTypes: {
          ...normalizedData.entities,
          categories: normalizedCategoriesWithSvg,
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

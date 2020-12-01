import { incomesConstants } from './../actions/actionTypes';
import { incomeTypeSvgCorrelation } from 'Utils/svgCorrelation';
import {
  handleSvgAddition,
  addPropertyLoListOfObjects
} from 'Utils/functions';

const initialState = {
  status: 'idle',
  incomes: [],
  error: false
}

const incomes = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case incomesConstants.GETINCOMES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case incomesConstants.GETINCOMES_SUCCESS:
      const incomesWithSvg = handleSvgAddition(
        payload,
        'category',
        incomeTypeSvgCorrelation
      );
      const finalIncomes = addPropertyLoListOfObjects(
        'type',
        'income',
        incomesWithSvg
      );
      return {
        ...state,
        status: 'succedded',
        incomes: [...finalIncomes],
      };
    case incomesConstants.GETINCOMES_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: payload,
      };
    case incomesConstants.ADDINCOME_REQUEST:
      return {
        ...state,
        status: 'adding',
      };
    case incomesConstants.ADDINCOME_SUCCESS:
      const incomeWithSvg = handleSvgAddition(
        payload,
        'category',
        incomeTypeSvgCorrelation
      );
      return {
        ...state,
        incomes: [].concat(state.incomes, incomeWithSvg),
        status: 'succedded',
      };
    case incomesConstants.DELETEINCOME_SUCCESS:
      return {
        ...state,
        status: 'succedded',
        incomes: state.incomes.filter((income) => {
          return parseInt(income.id) !== parseInt(payload.incomeId);
        }),
      };
    case incomesConstants.UPDATEINCOME_SUCCESS:
      const updatedIncomeWithSvg = handleSvgAddition(
        payload,
        'category',
        incomeTypeSvgCorrelation
      );
      return {
        ...state,
        status: 'succedded',
        incomes: state.incomes.map((income) => {
          if ((income.id === updatedIncomeWithSvg.id)) {
            return Object.assign(income, updatedIncomeWithSvg);
          } else {
            return income;
          }
        })
      }
    default:
      return state;
  }
};

export default incomes;

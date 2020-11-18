import { incomesConstants } from './../actions/actionTypes';
import { incomeTypeSvgCorrelation } from 'Utils/svgCorrelation';
import {
  handleSvgAddition,
  convertDateToString,
  addPropertyLoListOfObjects
} from 'Utils/functions';

const incomes = (state = { incomes: [] }, action) => {
  switch (action.type) {
    case incomesConstants.GETINCOMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case incomesConstants.GETINCOMES_SUCCESS:
      const incomesWithSvg = handleSvgAddition(
        action.incomes,
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
        loading: false,
        incomes: [...finalIncomes],
      };
    case incomesConstants.GETINCOMES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.error,
      };
    case incomesConstants.ADDINCOME_REQUEST:
      return {
        ...state,
        adding: true,
      };
    case incomesConstants.ADDINCOME_SUCCESS:
      const date = convertDateToString(action.income.transaction_date);
      const income = { ...action.income, transaction_date: date };
      const incomeWithSvg = handleSvgAddition(
        income,
        'category',
        incomeTypeSvgCorrelation
      );
      return {
        ...state,
        incomes: [].concat(state.incomes, incomeWithSvg),
        adding: false,
      };
    case incomesConstants.DELETEINCOME_SUCCESS:
      return {
        ...state,
        incomes: state.incomes.filter((income) => {
          return parseInt(income.id) !== parseInt(action.incomeId);
        }),
      };
    default:
      return state;
  }
};

export default incomes;

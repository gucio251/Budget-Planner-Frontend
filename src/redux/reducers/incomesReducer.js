import { incomesConstants } from './../actions/actionTypes';

const initialState = {
  status: 'idle',
  incomes: {},
  error: false,
};

const incomes = (state = initialState, {type, payload}) => {
  switch (type) {
    case incomesConstants.GETINCOMES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case incomesConstants.GETINCOMES_SUCCESS:
      return {
        ...state,
        status: 'succedded',
        incomes: payload,
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
      };
    case incomesConstants.ADDINCOME_SUCCESS:
      return {
        ...state,
        incomes: {
          ...state.incomes,
          [payload.id]: { ...payload }
        },
        status: 'succedded',
      };
    case incomesConstants.DELETEINCOME_SUCCESS:
      const objectCopy = { ...state.incomes };
      delete objectCopy[payload];
      return {
        ...state,
        status: 'succedded',
        incomes: objectCopy,
      };
    case incomesConstants.UPDATEINCOME_SUCCESS:
      const incomesCopy = {...state.incomes};
      return {
        ...state,
        expenses: {
          ...incomesCopy,
          [payload.id]: { ...payload },
        },
      };
    default:
      return state;
  }
};

export default incomes;

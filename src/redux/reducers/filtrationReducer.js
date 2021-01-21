import {filtrationConstants} from 'redux/actions/actionTypes';

const initialState = {
    type: 'All',
    category: 'All',
    amountFrom: null,
    amountTo: null
}

const filtration = (state=initialState, {type, payload}) => {
    switch (type) {
      case filtrationConstants.SETTRANSACTIONTYPEFILTER:
        return {
          ...state,
          type: payload,
          category: initialState.category,
        };
      case filtrationConstants.SETCATEGORYFILTER:
        return {
          ...state,
          category: payload,
        };
      case filtrationConstants.SETAMOUNTFROMFILTER:
        return {
          ...state,
          amountFrom: payload,
        };
      case filtrationConstants.SETAMOUNTTOFILTER:
        return {
          ...state,
          amountTo: payload,
        };
      default:
        return state;
    }
}

export default filtration;
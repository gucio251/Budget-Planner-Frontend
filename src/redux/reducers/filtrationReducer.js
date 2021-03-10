import {filtrationConstants} from 'redux/actions/actionTypes';

const initialData = {
  type: 'all',
  categories: [],
  subcategories: [],
  amountFrom: null,
  amountTo: null,
  comment: '',
};

const initialState = {
  appliedFilters: {
    ...initialData,
  },
  filtersToBeConfirmed: {
    ...initialData,
  },
};

const filtration = (state=initialState, {type, payload}) => {
    switch (type) {
      case filtrationConstants.SETTRANSACTIONTYPEFILTER:
        return {
          ...state,
          filtersToBeConfirmed: {
            ...state.filtersToBeConfirmed,
            type: payload
          }
        };
      case filtrationConstants.SETCATEGORYFILTER:
        return {
          ...state,
          filtersToBeConfirmed: {
            ...state.filtersToBeConfirmed,
            categories: payload,
          },
        };
      case filtrationConstants.SETSUBCATEGORYFILTER:
        return {
          ...state,
          filtersToBeConfirmed: {
            ...state.filtersToBeConfirmed,
            subcategories: payload,
          },
        };
      case filtrationConstants.SETAMOUNTFROMFILTER:
        return {
          ...state,
          filtersToBeConfirmed: {
            ...state.filtersToBeConfirmed,
            amountFrom: payload,
          },
        };
      case filtrationConstants.SETAMOUNTTOFILTER:
        return {
          ...state,
          filtersToBeConfirmed: {
            ...state.filtersToBeConfirmed,
            amountTo: payload,
          },
        };
      case filtrationConstants.SETCOMMENTFILTER:
        return {
          ...state,
          filtersToBeConfirmed: {
            ...state.filtersToBeConfirmed,
            comment: payload,
          },
        };
      case filtrationConstants.APPLYFILTERS: {
        return {
          ...state,
          appliedFilters: {
            ...state.appliedFilters,
            ...state.filtersToBeConfirmed
          },
        };
      }
      case filtrationConstants.CLEARFILTERS: {
        return {
          ...state,
          ...initialState
        };
      }
      default:
        return state;
    }
}

export default filtration;
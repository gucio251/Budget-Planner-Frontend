import { currenciesConstants } from './../actions/actionTypes';


const currencies = (state = {}, action) => {
  switch (action.type) {
    case currenciesConstants.GETCURRENCIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case currenciesConstants.GETCURRENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        currencies: action.currencies,
      };
    case currenciesConstants.GETCURRENCIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.error,
      };
    default:
      return state;
  }
};

export default currencies;

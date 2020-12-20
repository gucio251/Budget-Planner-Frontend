import { currenciesConstants } from './../actions/actionTypes';

const initialState = {
  status: 'idle',
  statusCurrencies: 'idle',
  statusRates: 'idle',
  currencies: [],
  errorMsg: false,
  rates: {},
  active: 'USD'
}
const currencies = (state = initialState, { type, payload }) => {
  switch (type) {
    case currenciesConstants.GETCURRENCIES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case currenciesConstants.GETCURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: payload,
        statusCurrencies: 'succedded',
        status: state.statusRates === 'succedded' ? 'succedded' : state.status
      };
    case currenciesConstants.GETCURRENCIES_FAILURE:
      return {
        ...state,
        status: 'failed',
        errorMsg: payload,
      };
    case currenciesConstants.CHANGECURRENCY_SUCCESS:
      return {
        ...state,
        active: payload,
      }
    case currenciesConstants.GETRATES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case currenciesConstants.GETRATES_SUCCESS:
      return {
        ...state,
        statusRates: 'succedded',
        status: state.statusCurrencies === 'succedded' ? 'succedded' : state.status,
        rates: payload,
      };
    case currenciesConstants.GETRATES_FAILURE:
      return {
        ...state,
        status: 'failed',
        errorMsg: payload,
      };
    default:
      return state;
  }
};

export default currencies;

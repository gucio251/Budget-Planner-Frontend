import { currenciesConstants } from './../actions/actionTypes';
import { currenciesSvgCorrelation } from 'Utils/svgCorrelation'

const initialState = {
  status: 'idle',
  statusCurrencies: 'idle',
  statusRates: 'idle',
  currencies: {},
  errorMsg: false,
  rates: {},
  active: null,
  Icon: currenciesSvgCorrelation['USD'],
  SmallIcon: currenciesSvgCorrelation['USDSmall']
}
const currencies = (state = initialState, { type, payload }) => {
  switch (type) {
    case currenciesConstants.GETCURRENCIES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case currenciesConstants.GETCURRENCIES_SUCCESS:
      const firstCurrencyNumber = Object.keys(payload)[0];
      const defaultCurrencyNumber = parseInt(firstCurrencyNumber) + 1;

      return {
        ...state,
        currencies: payload,
        active: defaultCurrencyNumber,
        statusCurrencies: 'succedded',
        status: state.statusRates === 'succedded' ? 'succedded' : state.status,
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
        Icon: currenciesSvgCorrelation[state.currencies[payload].name],
        SmallIcon: currenciesSvgCorrelation[`${state.currencies[payload].name}Small`],
      };
    case currenciesConstants.GETRATES_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case currenciesConstants.GETRATES_SUCCESS:
      console.log(payload)
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

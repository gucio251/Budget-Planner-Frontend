import { currenciesConstants } from 'redux/actions/actionTypes';
import * as currenciesApi from 'api/currenciesApi';
import {Currencies} from 'api/services/API';

const loadCurrencies = () => (dispatch) => {
  const request = () => {
    return { type: currenciesConstants.GETCURRENCIES_REQUEST };
  };
  const success = (payload) => {
    return { type: currenciesConstants.GETCURRENCIES_SUCCESS, payload };
  };
  const failure = (payload) => {
    return { type: currenciesConstants.GETCURRENCIES_FAILURE, payload };
  };

  dispatch(request());

  Currencies.index().then(
    ({result}) => {
      const finalResult = result.map(({id, name}) => {
          return {
              id: id,
              value: name,
              label: name
          }
      })
      dispatch(success(finalResult));
    },
    (error) => {
      dispatch(failure(error));
    }
  );
};

const loadRatesFromApi = () => (dispatch) => {
    const request = () => {
      return { type: currenciesConstants.GETRATES_FAILURE };
    };
    const success = (payload) => {
      return { type: currenciesConstants.GETRATES_SUCCESS, payload };
    };
    const failure = (payload) => {
      return { type: currenciesConstants.GETRATES_FAILURE, payload };
    };

    dispatch(request());

    currenciesApi.loadRates().then(
      ({ rates }) => dispatch(success(rates)),
      (error) => dispatch(failure(error))
    );
}

const changeActiveCurrency = (currencyName) => (dispatch) => {
  const success = (payload) => {
    return { type: currenciesConstants.CHANGECURRENCY_SUCCESS, payload };
  };

  dispatch(success(currencyName));
}
export const currencyActions = {
  loadCurrencies,
  loadRatesFromApi,
  changeActiveCurrency
};

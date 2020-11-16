import { currenciesConstants } from 'redux/actions/actionTypes';
import * as currenciesApi from 'api/currenciesApi';

const loadCurrencies = (token) => (dispatch) => {
  const request = () => {
    return { type: currenciesConstants.GETCURRENCIES_REQUEST };
  };
  const success = (currencies) => {
    return { type: currenciesConstants.GETCURRENCIES_SUCCESS, currencies };
  };
  const failure = (error) => {
    return { type: currenciesConstants.GETCURRENCIES_FAILURE, error };
  };

  dispatch(request());

  currenciesApi.loadCurrencies(token).then(
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

export const currencyActions = {
  loadCurrencies,
};

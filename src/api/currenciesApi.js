import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'http://localhost:4000/api/';

export const loadCurrencies = (token) => {
  return fetch(baseUrl + 'currencies/all', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const loadRates = () => {
  const apiUrl = 'https://api.exchangeratesapi.io/latest?base=USD';
  return fetch(apiUrl, {
    method: 'GET'
  })
    .then(handleResponse)
    .catch(handleError);
}

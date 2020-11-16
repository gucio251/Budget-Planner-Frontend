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

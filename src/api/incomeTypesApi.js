import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'http://localhost:4000/api/';

export const loadIncomeTypes = (token) => {
  return fetch(baseUrl + 'incomeTypes', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

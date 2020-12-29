import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'https://budget-planner-api.herokuapp.com/api/';

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

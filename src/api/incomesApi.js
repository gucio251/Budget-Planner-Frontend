import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'http://localhost:4000/api/';

export const load = (token) => {
  return fetch(baseUrl + 'incomes', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export function save(token, income) {
  return fetch(baseUrl + 'incomes/' + (income.id || ''), {
    method: income.id ? 'PUT' : 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(income),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSingle(token, income) {
  return fetch(baseUrl + 'incomes/' + income.id, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(income),
  })
    .then(handleResponse)
    .catch(handleError);
}

export const Incomes = {
  load,
  save,
  deleteSingle
};

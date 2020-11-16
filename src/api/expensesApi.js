import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'http://localhost:4000/api/';

export const load = (token) => {
  return fetch(baseUrl + 'expenses', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export function save(token, expense) {
  return fetch(baseUrl + 'expenses' + (expense.id || ''), {
    method: expense.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(expense),
  })
    .then(handleResponse)
    .catch(handleError);
}

export const Expenses = {
    load,
    save
}

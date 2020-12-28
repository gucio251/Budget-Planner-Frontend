import { handleResponse, handleError } from "./apiUtils";
const baseUrl = 'http://budget-planner-api.herokuapp.com/api/';

export function getAllUsers() {
  return fetch(`${baseUrl}users`).then(handleResponse).catch(handleError);
}

export function saveUser(user) {
  return fetch(baseUrl + "signup" + (user.id || ""), {
    method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}

async function handleErrors(response){
  if(!response.ok){
    const body = await response.json();
    throw Error(body.message);
  }
  return response;
}

export function authLogin(user){
  return fetch(baseUrl + "signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleErrors)
    .then(handleResponse)
    .catch(handleError);
}
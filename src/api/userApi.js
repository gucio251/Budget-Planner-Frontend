import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:4000/api/";

export function getAllUsers() {
  return fetch(`${baseUrl}users`).then(handleResponse).catch(handleError);
}

export function saveUser(user) {
  return fetch(baseUrl + "signup" + (user.id || ""), {
    method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}
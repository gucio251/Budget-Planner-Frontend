import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:4000/api/users";

export function getAllUsers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:4000/api/";

export const loadExpenseTypes = (token) => {
    return fetch(baseUrl + "expenseTypes", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`,
        }
    })
        .then(handleResponse)
        .catch(handleError);
}
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = 'http://budget-planner-api.herokuapp.com/api/';

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
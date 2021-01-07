import axios from 'axios';

export const loadRates = () => {
  const apiUrl = 'https://api.exchangeratesapi.io/latest?base=USD';
  return axios.get(apiUrl, {})
    .then((response) =>{
      return response.data;
    }, (error) => {
      return error
    });
}
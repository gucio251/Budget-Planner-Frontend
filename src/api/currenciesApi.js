import axios from 'axios';

export const loadRates = () => {
  const apiUrl = `https://api.currconv.com/api/v7/convert?q=USD_PLN,USD_EUR,USD_GBP,USD_USD&compact=ultra&apiKey=${process.env.REACT_APP_CURRENCIES_API_KEY}`;
  return axios.get(apiUrl, {})
    .then((response) =>{
      return response.data;
    }, (error) => {
      return error
    });
}
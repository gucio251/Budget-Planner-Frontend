import axios from 'axios';
import { navigate } from '@reach/router';
import { routes } from 'routes';

const apiClient = axios.create({
  baseURL: 'https://budget-planner-api.herokuapp.com/api',
});

apiClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    };
  },
  (error) => Promise.reject(error.response.data)
);

apiClient.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    navigate(routes.login);
    if(error.response.status === 401) localStorage.removeItem('token');
    return Promise.reject(error.response.data);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
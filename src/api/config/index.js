import axios from 'axios';

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
    return Promise.reject(error.response.data);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
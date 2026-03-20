import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
});

export const fetchNews = async (params) => {
  const response = await api.get('/news', { params });
  return response.data;
};

export default api;

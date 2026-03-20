import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchNews = async (params) => {
  const response = await api.get("/news", { params });
  return response.data;
};

export default api;
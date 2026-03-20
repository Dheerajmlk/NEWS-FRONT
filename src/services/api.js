import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "?v=2";

console.log("API URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
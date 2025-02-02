import axios from 'axios';
import development from '../config/default';
const api = axios.create({
  baseURL: development.VITE_API
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
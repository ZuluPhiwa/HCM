import axios from 'axios';
import { Constants } from './constants';

// Public API (no auth) 
export const publicApi = axios.create({
  baseURL: Constants.BASE_URL,
  timeout: 10000,
});

// Use this for authenticated API calls (with JWT)
const api = axios.create({
  baseURL: Constants.BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
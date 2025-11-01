import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const login = async (credentials) => {
  const response = await axios.post(`${API}/auth/login`, credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API}/auth/signup`, userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API}/auth/logout`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API}/auth/me`);
  return response.data;
};
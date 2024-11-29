import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token); // Save the token in localStorage
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  },

  passwordReset: async (email) => {
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await axios.get(`${API_URL}/verify-email/${token}`);
    return response.data;
  },
};

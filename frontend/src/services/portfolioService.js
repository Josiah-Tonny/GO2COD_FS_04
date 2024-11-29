import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolio';

export const portfolioService = {
  getPortfolio: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addPortfolioItem: async (title, description, imageUrl) => {
    const response = await axios.post(API_URL, { title, description, imageUrl });
    return response.data;
  },

  deletePortfolioItem: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

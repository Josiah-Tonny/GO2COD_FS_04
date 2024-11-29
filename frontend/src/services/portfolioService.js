// src/services/portfolioService.js
import api from '../utils/api';

export const portfolioService = {
  getPortfolio: async () => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw new Error('Failed to fetch portfolio items');
    }
  }
};
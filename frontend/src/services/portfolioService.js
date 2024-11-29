// src/services/portfolioService.js
import api from '../utils/api';

export const portfolioService = {
  getPortfolio: async () => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch portfolio items');
    }
  },

  createPortfolioItem: async (data) => {
    try {
      const response = await api.post('/portfolio', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create portfolio item');
    }
  },

  updatePortfolioItem: async (id, data) => {
    try {
      const response = await api.put(`/portfolio/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update portfolio item');
    }
  },

  deletePortfolioItem: async (id) => {
    try {
      const response = await api.delete(`/portfolio/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete portfolio item');
    }
  }
};
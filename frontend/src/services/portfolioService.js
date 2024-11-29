// src/services/portfolioService.js
import api from '../utils/api';

const handleApiError = (error, defaultMessage) => {
  console.error('API Error:', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    endpoint: error.config?.url
  });

  if (error.message === 'Network Error') {
    throw new Error('Unable to connect to the server. Please check your connection.');
  }

  throw new Error(
    error.response?.data?.message || 
    error.message || 
    defaultMessage
  );
};

export const portfolioService = {
  getPortfolio: async () => {
    try {
      console.log('Fetching portfolio from:', `${process.env.REACT_APP_API_URL}/portfolio`);
      const response = await api.get('/portfolio');
      console.log('Portfolio data received:', response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch portfolio items');
    }
  },

  createPortfolioItem: async (data) => {
    try {
      console.log('Creating portfolio item:', data);
      const response = await api.post('/portfolio', data);
      console.log('Portfolio item created:', response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create portfolio item');
    }
  },

  updatePortfolioItem: async (id, data) => {
    try {
      console.log('Updating portfolio item:', { id, data });
      const response = await api.put(`/portfolio/${id}`, data);
      console.log('Portfolio item updated:', response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, `Failed to update portfolio item ${id}`);
    }
  },

  deletePortfolioItem: async (id) => {
    try {
      console.log('Deleting portfolio item:', id);
      const response = await api.delete(`/portfolio/${id}`);
      console.log('Portfolio item deleted:', response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, `Failed to delete portfolio item ${id}`);
    }
  },

  // Helper method to validate portfolio item data
  validatePortfolioItem: (data) => {
    const errors = [];
    
    if (!data.title) {
      errors.push('Title is required');
    }
    
    if (!data.description) {
      errors.push('Description is required');
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    
    return true;
  }
};

// Add type checking if using TypeScript
export const PortfolioItemType = {
  _id: String,
  title: String,
  description: String,
  image: String,
  link: String,
  technologies: Array,
  createdAt: Date,
  updatedAt: Date
};
import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserPortfolio = (userId) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`/api/portfolio/${userId}`);
        setPortfolio(response.data);
      } catch (err) {
        setError('Failed to fetch portfolio data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPortfolio();
    }
  }, [userId]);

  // Add new portfolio item
  const addPortfolioItem = async (item) => {
    try {
      const response = await axios.post(`/api/portfolio/${userId}`, item);
      setPortfolio((prev) => [...prev, response.data]);
    } catch (err) {
      setError('Failed to add portfolio item');
    }
  };

  // Update portfolio item
  const updatePortfolioItem = async (itemId, updatedItem) => {
    try {
      const response = await axios.put(`/api/portfolio/${userId}/${itemId}`, updatedItem);
      setPortfolio((prev) =>
        prev.map((item) => (item._id === itemId ? { ...item, ...updatedItem } : item))
      );
    } catch (err) {
      setError('Failed to update portfolio item');
    }
  };

  // Remove portfolio item
  const removePortfolioItem = async (itemId) => {
    try {
      await axios.delete(`/api/portfolio/${userId}/${itemId}`);
      setPortfolio((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      setError('Failed to remove portfolio item');
    }
  };

  return { portfolio, loading, error, addPortfolioItem, updatePortfolioItem, removePortfolioItem };
};

export default useUserPortfolio;

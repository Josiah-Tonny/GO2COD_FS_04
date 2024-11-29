import React, { useState, useEffect } from 'react';
import { portfolioService } from '../../services/portfolioService';
import PortfolioItem from './PortfolioItem';

const PortfolioList = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioService.getPortfolio();
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      setError(err.message || 'Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error Loading Portfolio</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <button 
          onClick={fetchPortfolio}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Portfolio</h2>
      </div>

      {portfolio.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">No portfolio items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <PortfolioItem 
              key={item._id} 
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
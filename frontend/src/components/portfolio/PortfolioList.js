import React, { useState, useEffect } from 'react';
import { portfolioService } from '../../services/portfolioService';

const PortfolioList = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting portfolio fetch...');
      const data = await portfolioService.getPortfolio();
      console.log('Portfolio data received:', data);
      setPortfolio(data);
    } catch (err) {
      console.error('Portfolio fetch failed:', err);
      setError(err.message);
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
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <button 
          onClick={fetchPortfolio}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.length > 0 ? (
          portfolio.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No portfolio items found
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
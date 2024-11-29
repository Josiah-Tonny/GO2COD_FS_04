// components/admin/PortfolioManager.js
import React, { useState, useEffect } from 'react';
import { portfolioService } from '../../services/portfolioService';

const PortfolioManager = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const data = await portfolioService.getPortfolio();
      setPortfolio(data);
    } catch (err) {
      setError('Failed to fetch portfolio items');
      console.error('Error fetching portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleteInProgress(id);
      await portfolioService.deletePortfolioItem(id);
      setPortfolio(portfolio.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete portfolio item');
    } finally {
      setDeleteInProgress(null);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Portfolio</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {/* Add new item logic */}}
        >
          Add New Item
        </button>
      </div>

      {portfolio.length === 0 ? (
        <p className="text-gray-500">No portfolio items found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-end space-x-2">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {/* Edit logic */}}
                >
                  Edit
                </button>
                <button 
                  className={`bg-red-500 text-white px-3 py-1 rounded ${
                    deleteInProgress === item._id ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleDelete(item._id)}
                  disabled={deleteInProgress === item._id}
                >
                  {deleteInProgress === item._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
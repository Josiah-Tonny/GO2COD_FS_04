import React, { useState, useEffect } from 'react';
import { portfolioService } from '../../services/portfolioService';
import PortfolioItem from './PortfolioItem';

const PortfolioList = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const data = await portfolioService.getPortfolio();
      setPortfolio(data);
    };
    fetchPortfolio();
  }, []);

  return (
    <div>
      <h2>Portfolio</h2>
      <div>
        {portfolio.map((item) => (
          <PortfolioItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;

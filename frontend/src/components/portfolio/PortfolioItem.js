import React from 'react';

const PortfolioItem = ({ item }) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <img src={item.imageUrl} alt={item.title} />
      <p>{item.description}</p>
    </div>
  );
};

export default PortfolioItem;

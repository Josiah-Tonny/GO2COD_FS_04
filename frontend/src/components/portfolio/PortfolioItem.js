import React from 'react';

const PortfolioItem = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {item.image && (
        <div className="relative h-48">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        {item.technologies && (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
};

export default PortfolioItem;
// components/common/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  const location = useLocation();

  // Add loading state
  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Role-based access control
  if (authState.user?.role !== 'admin') {
    return (
      <Navigate 
        to="/" 
        replace 
        state={{ 
          error: "You don't have permission to access this page" 
        }} 
      />
    );
  }

  return children;
};

export default PrivateRoute;
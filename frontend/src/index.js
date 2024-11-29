import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Environment logging
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('Base Path:', process.env.PUBLIC_URL);

// Error handling setup
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Global Error:', {
    msg,
    url,
    lineNo,
    columnNo,
    error,
    path: window.location.pathname
  });
  return false;
};

// Root element setup
const container = document.getElementById('root');
const root = createRoot(container);

// App rendering with GitHub Pages basename
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// Promise rejection handling
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', {
    reason: event.reason,
    path: window.location.pathname
  });
});
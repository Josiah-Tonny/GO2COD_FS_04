import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // TailwindCSS will be imported here
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById('root')
);

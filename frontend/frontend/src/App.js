// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext'; // Updated import
import { ThemeProvider } from './contexts/ThemeContext';

// Common Components
import Navigation from './components/common/Navigation';
import PrivateRoute from './components/common/PrivateRoute';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import PortfolioManager from './components/admin/PortfolioManager';
import BlogPostManager from './components/admin/BlogPostManager';

// Public Components
import PortfolioList from './components/portfolio/PortfolioList';
import BlogList from './components/blog/BlogList';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PasswordReset from './components/auth/PasswordReset';
import EmailVerification from './components/auth/EmailVerification';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PortfolioList />} />
                <Route path="/portfolio" element={<PortfolioList />} />
                <Route path="/blog" element={<BlogList />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route 
                  path="/verify-email/:token" 
                  element={<EmailVerification />} 
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/portfolio"
                  element={
                    <PrivateRoute>
                      <PortfolioManager />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/blog-posts"
                  element={
                    <PrivateRoute>
                      <BlogPostManager />
                    </PrivateRoute>
                  }
                />

                {/* Catch-all Route - 404 Page */}
                <Route
                  path="*"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Page Not Found
                      </h2>
                      <p className="mt-2 text-gray-600">
                        The page you're looking for doesn't exist.
                      </p>
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
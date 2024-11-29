// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import components that should always be available immediately
import Navigation from './components/common/Navigation';
import PrivateRoute from './components/common/PrivateRoute';

// Lazy load other components
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const PortfolioManager = lazy(() => import('./components/admin/PortfolioManager'));
const BlogPostManager = lazy(() => import('./components/admin/BlogPostManager'));
const PortfolioList = lazy(() => import('./components/portfolio/PortfolioList'));
const BlogList = lazy(() => import('./components/blog/BlogList'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const PasswordReset = lazy(() => import('./components/auth/PasswordReset'));
const EmailVerification = lazy(() => import('./components/auth/EmailVerification'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// 404 Page component
const NotFound = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
    <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
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
            <Route path="/verify-email/:token" element={<EmailVerification />} />

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

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
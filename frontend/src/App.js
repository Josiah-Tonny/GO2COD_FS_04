import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import PrivateRoute from './components/common/PrivateRoute';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Lazy load components with error handling
const AdminDashboard = lazy(() => 
  import('./components/admin/AdminDashboard').catch(err => {
    console.error('Failed to load AdminDashboard:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const PortfolioManager = lazy(() => 
  import('./components/admin/PortfolioManager').catch(err => {
    console.error('Failed to load PortfolioManager:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const BlogPostManager = lazy(() => 
  import('./components/admin/BlogPostManager').catch(err => {
    console.error('Failed to load BlogPostManager:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const PortfolioList = lazy(() => 
  import('./components/portfolio/PortfolioList').catch(err => {
    console.error('Failed to load PortfolioList:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const BlogList = lazy(() => 
  import('./components/blog/BlogList').catch(err => {
    console.error('Failed to load BlogList:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const Login = lazy(() => 
  import('./components/auth/Login').catch(err => {
    console.error('Failed to load Login:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const Register = lazy(() => 
  import('./components/auth/Register').catch(err => {
    console.error('Failed to load Register:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const PasswordReset = lazy(() => 
  import('./components/auth/PasswordReset').catch(err => {
    console.error('Failed to load PasswordReset:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

const EmailVerification = lazy(() => 
  import('./components/auth/EmailVerification').catch(err => {
    console.error('Failed to load EmailVerification:', err);
    return { default: () => <div>Error loading component</div> };
  })
);

// 404 Page component
const NotFound = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
    <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  console.log('App rendering');
  
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
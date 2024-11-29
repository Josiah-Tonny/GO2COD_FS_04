import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import PrivateRoute from './components/common/PrivateRoute';

// Utility function for lazy loading with error handling
const lazyLoadComponent = (componentPath, componentName) => {
  return lazy(() =>
    import(componentPath).catch(err => {
      console.error(`Failed to load ${componentName}:`, err);
      return {
        default: () => (
          <div className="text-red-600 p-4">Error loading {componentName}</div>
        )
      };
    })
  );
};

// Components
const AdminDashboard = lazyLoadComponent('./components/admin/AdminDashboard', 'AdminDashboard');
const PortfolioManager = lazyLoadComponent('./components/admin/PortfolioManager', 'PortfolioManager');
const BlogPostManager = lazyLoadComponent('./components/admin/BlogPostManager', 'BlogPostManager');
const PortfolioList = lazyLoadComponent('./components/portfolio/PortfolioList', 'PortfolioList');
const BlogList = lazyLoadComponent('./components/blog/BlogList', 'BlogList');
const Login = lazyLoadComponent('./components/auth/Login', 'Login');
const Register = lazyLoadComponent('./components/auth/Register', 'Register');
const PasswordReset = lazyLoadComponent('./components/auth/PasswordReset', 'PasswordReset');
const EmailVerification = lazyLoadComponent('./components/auth/EmailVerification', 'EmailVerification');

// Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
  </div>
);

const NotFound = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
    <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
  </div>
);

// Route configurations
const publicRoutes = [
  { path: '/', element: <PortfolioList /> },
  { path: '/portfolio', element: <PortfolioList /> },
  { path: '/blog', element: <BlogList /> }
];

const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/password-reset', element: <PasswordReset /> },
  { path: '/verify-email/:token', element: <EmailVerification /> }
];

const adminRoutes = [
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/portfolio', element: <PortfolioManager /> },
  { path: '/admin/blog-posts', element: <BlogPostManager /> }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* Auth Routes */}
            {authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* Protected Admin Routes */}
            {adminRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<PrivateRoute>{element}</PrivateRoute>}
              />
            ))}

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import PrivateRoute from './components/common/PrivateRoute';

// Utility function for lazy loading with error handling
const lazyLoadComponent = (componentPath, componentName) => {
  return lazy(() => 
    import(componentPath).catch(err => {
      console.error(`Failed to load ${componentName}:`, err);
      return {
        default: () => (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600">
              Failed to load {componentName}
            </h2>
            <p className="text-gray-600 mt-2">{err.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )
      };
    })
  );
};

// Lazy loaded components
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const PortfolioManager = lazy(() => import('./components/admin/PortfolioManager'));
const BlogPostManager = lazy(() => import('./components/admin/BlogPostManager'));
const PortfolioList = lazy(() => import('./components/portfolio/PortfolioList'));
const BlogList = lazy(() => import('./components/blog/BlogList'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const PasswordReset = lazy(() => import('./components/auth/PasswordReset'));
const EmailVerification = lazy(() => import('./components/auth/EmailVerification'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
  </div>
);

// 404 component
const NotFound = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
    <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
    <button 
      onClick={() => window.location.href = process.env.PUBLIC_URL + '/'}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Go Home
    </button>
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
            {/* GitHub Pages redirect */}
            <Route 
              path="/GO2COD_FS_04" 
              element={<Navigate to="/" replace />} 
            />

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
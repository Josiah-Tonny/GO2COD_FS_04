// components/admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          to="/admin/portfolio" 
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <h3 className="text-xl font-semibold">Portfolio Management</h3>
          <p className="text-gray-600">Manage your portfolio items</p>
        </Link>
        <Link 
          to="/admin/blog-posts" 
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <h3 className="text-xl font-semibold">Blog Management</h3>
          <p className="text-gray-600">Manage your blog posts</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
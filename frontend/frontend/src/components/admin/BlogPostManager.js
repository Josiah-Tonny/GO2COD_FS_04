// components/admin/BlogPostManager.js
import React, { useState, useEffect } from 'react';
import { blogService } from '../../services/blogService';

const BlogPostManager = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleteInProgress(id);
      await blogService.deleteBlogPost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    } finally {
      setDeleteInProgress(null);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {/* Add new post logic */}}
        >
          Add New Post
        </button>
      </div>
      
      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts found</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.createdAt}</p>
                </div>
                <div className="space-x-2">
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {/* Edit logic */}}
                  >
                    Edit
                  </button>
                  <button 
                    className={`bg-red-500 text-white px-3 py-1 rounded ${
                      deleteInProgress === post._id ? 'opacity-50' : ''
                    }`}
                    onClick={() => handleDelete(post._id)}
                    disabled={deleteInProgress === post._id}
                  >
                    {deleteInProgress === post._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPostManager;
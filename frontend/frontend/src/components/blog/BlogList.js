import React, { useState, useEffect } from 'react';
import { blogService } from '../../services/blogService';
import BlogPost from './BlogPost';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await blogService.getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;

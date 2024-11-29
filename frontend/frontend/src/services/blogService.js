import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blog';

export const blogService = {
  getPosts: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addBlogPost: async (title, content) => {
    const response = await axios.post(API_URL, { title, content });
    return response.data;
  },

  deleteBlogPost: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

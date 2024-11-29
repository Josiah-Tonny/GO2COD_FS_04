const BlogPost = require('../models/BlogPost');

// Create blog post
exports.createBlogPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const newPost = new BlogPost({
            title,
            content,
            tags
        });
        
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog post',
            error: error.message
        });
    }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching blog posts',
            error: error.message
        });
    }
};

// Update blog post
exports.updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const post = await BlogPost.findByIdAndUpdate(id, updates, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating blog post',
            error: error.message
        });
    }
};

// Delete blog post
exports.deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await BlogPost.findByIdAndDelete(id);
        
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting blog post',
            error: error.message
        });
    }
};
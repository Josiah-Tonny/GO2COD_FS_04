const PortfolioItem = require('../models/PortfolioItem');

// Create portfolio item
exports.addPortfolioItem = async (req, res) => {
    const { title, description, image, tags } = req.body;
    
    try {
        const item = new PortfolioItem({
            title,
            description,
            image,
            tags
        });
        
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all portfolio items
exports.getAllPortfolioItems = async (req, res) => {
    try {
        const items = await PortfolioItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Update portfolio item
exports.updatePortfolioItem = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const item = await PortfolioItem.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!item) {
            return res.status(404).json({
                message: 'Portfolio item not found'
            });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete portfolio item
exports.deletePortfolioItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await PortfolioItem.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({
                message: 'Portfolio item not found'
            });
        }

        res.status(200).json({
            message: 'Portfolio item deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
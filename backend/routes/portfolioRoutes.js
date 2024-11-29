const express = require('express');
const router = express.Router();
const passport = require('passport');
const portfolioController = require('../controllers/portfolioController');
const roleCheck = require('../middleware/roleCheck');

// Add Portfolio Item (Admin Only)
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    roleCheck('admin'),
    portfolioController.addPortfolioItem
);

// Get All Portfolio Items
router.get(
    '/',
    portfolioController.getAllPortfolioItems
);

// Update Portfolio Item (Admin Only)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    roleCheck('admin'),
    portfolioController.updatePortfolioItem
);

// Delete Portfolio Item (Admin Only)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    roleCheck('admin'),
    portfolioController.deletePortfolioItem
);

module.exports = router;

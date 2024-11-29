const express = require('express');
const router = express.Router();
const passport = require('passport');
const blogController = require('../controllers/blogController');
const roleCheck = require('../middleware/roleCheck');

// Blog routes
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    roleCheck('admin'),
    blogController.createBlogPost  // Make sure this method exists in blogController
);

router.get('/', blogController.getAllBlogPosts);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    roleCheck('admin'),
    blogController.updateBlogPost
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    roleCheck('admin'),
    blogController.deleteBlogPost
);

module.exports = router;
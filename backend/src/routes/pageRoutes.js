const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.post('/', pageController.createPage);
router.get('/:slug', pageController.getPageBySlug);

module.exports = router;
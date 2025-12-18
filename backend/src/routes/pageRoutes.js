const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.route('/')
    .get(pageController.getPages)
    .post(pageController.createPage);


router.get('/:slug', pageController.getPageBySlug);

module.exports = router;
const Page = require('../models/Page');

exports.createPage = async (req, res) => {
    try {
        const page = await Page.create(req.body);
        res.status(201).json(page);

    }catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getPageBySlug = async (req, res) => {
    const page = await Page.findOne({slug: req.params.slug})
        .populate('parent');
        
    res.json(page);
};
const Page = require('../models/Page');

// 1. Define createPage
const createPage = async (req, res) => {
    try {
        const { title, slug, content, parent, category } = req.body;
        
        if (parent) {
            const parentPage = await Page.findById(parent);
            if (!parentPage) {
                return res.status(404).json({ message: 'Parent category not found' });
            }
        }

        const page = await Page.create({
            title,
            slug,
            content,
            parent: parent || null,
            category
        });

        res.status(201).json(page);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. Define getPageBySlug
const getPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug }).populate('parent');
        
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        const children = await Page.find({ parent: page._id }).select('title slug category');

        res.json({ page, children });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// 3. Define getPages
const getPages = async (req, res) => {
    try {
        const pages = await Page.find({ parent: null }).select('title slug');
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. EXPORT EVERYTHING HERE AT THE BOTTOM
module.exports = {
    createPage,
    getPageBySlug,
    getPages
};
const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required :true
    },

    slug: {
        type: String,
        unique: true
    },

    content: {
        type: String
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        default: null
    },

    category: {
        type: String,
        enum: ['culture', 'religion', 'sect', 'region', 'practice'],
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('Page', pageSchema);
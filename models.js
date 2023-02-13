const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
    subCategory: [String],
    description: String,
    authorName: String,
    authorAvatar: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    cover: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
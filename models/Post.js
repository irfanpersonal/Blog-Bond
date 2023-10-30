const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Post Name']
    },
    content: {
        type: String,
        required: [true, 'Must Provide Post Content']
    },
    coverImage: {
        type: String,
        required: [true, 'Must Provide Post Cover Image']
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'Must Provide Post Created By'],
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
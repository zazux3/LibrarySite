const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    author: {
        type: String,
        required: [true, 'Please add an author']
    },
    publishedYear: {
        type: Number,
        required: [true, 'Please add the publication year']
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);

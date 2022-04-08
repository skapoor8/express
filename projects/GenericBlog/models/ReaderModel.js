const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReaderSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    commentHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
    
});

module.exports = mongoose.model('reader', ReaderSchema);
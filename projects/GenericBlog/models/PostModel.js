const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    
    coverImage: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'public'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    tags: [
        {
            type: String,
        }
    ],

    dateCreated: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, 
    
    allowComments: {
        type: Boolean,
        default: false
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
    
});

module.exports = mongoose.model('post', PostSchema);
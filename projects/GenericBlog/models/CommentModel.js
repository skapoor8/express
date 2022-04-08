const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    commentIsApproved: {
        type: Boolean,
        dafault: true,
    },
    reader: {
        type: Schema.Types.ObjectId,
        ref: 'reader'
    }, 
    
    
});

module.exports = mongoose.model('comment', CommentSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
    
});

module.exports = mongoose.model('series', SeriesSchema);
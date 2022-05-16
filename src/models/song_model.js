const  mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    track_number: {
        type: Number,
        required: true
    },
    length: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Song', songSchema);
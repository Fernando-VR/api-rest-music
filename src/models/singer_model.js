const  mongoose = require('mongoose');

const singerSchema = new mongoose.Schema({
    artistic_name: {
        type: String,
        required: true
    },
    real_name: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    albums: {
        type: [ ]
    }
});

module.exports = mongoose.model('Singer', singerSchema);
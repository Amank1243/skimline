const mongoose = require('mongoose');

// Beach Schema
// Will add more related information later
const beachSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        default: 'California'
    },

    // No idea how I am going to get the beach slope yet. Need to look into it because I couldn't find an api
    // or dataset to provide updated information
    slope: {
        type: Number,
        default: null
    }
});

// Beach Model
const Movie = mongoose.model('Beach', beachSchema);

module.exports = Movie;
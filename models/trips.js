const mongoose = require('mongoose');

var tripsSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
});

const tripsModel = mongoose.model('journeys', tripsSchema);

module.exports = tripsModel;

console.log('====== TRIPSMODEL export done')
const mongoose = require('mongoose');

var tripsSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
});

var usersSchema = mongoose.Schema({
    email: String,
    lastName: String,
    firstName: String,
    password: String,
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;

console.log('====== USERSMODEL export done')
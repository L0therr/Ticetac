const mongoose = require('mongoose');

var tripsSchema = mongoose.Schema({
    fk_trip: String
});

var eachSchema = mongoose.Schema({
    order: [tripsSchema],
})

var usersSchema = mongoose.Schema({
    email: String,
    lastName: String,
    firstName: String,
    password: String,
    orders: [eachSchema],
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;

console.log('====== USERSMODEL export done')
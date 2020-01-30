const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    email: String,
    lastName: String,
    firstName: String,
    password: String,
    // orders: [],
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;

console.log('====== USERSMODEL export done')
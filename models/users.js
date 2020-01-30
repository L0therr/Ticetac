const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,

    // orders: [],
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;

console.log('====== USERSMODEL export done')
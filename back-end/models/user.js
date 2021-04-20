var mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', User);
var mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    preference: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pref'}]
});

module.exports = mongoose.model('User', User);
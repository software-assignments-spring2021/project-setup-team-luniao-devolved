var mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    preference: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pref'}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
    pasttrip: {type: mongoose.Schema.Types.ObjectId, ref: 'PastTrip'}
});

module.exports = mongoose.model('User', User);
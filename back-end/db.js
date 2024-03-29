const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;
const client = new MongoClient(url);

client.connect();

const Poll = new mongoose.Schema({
    name: String,
    date: String,
    message: String,
    data: [Object],
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'}
});

mongoose.model('Poll', Poll);

const Itin = new mongoose.Schema({
    type: String,
    name: String,
    location: String,
    time: String,
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Itin', Itin);

const Trip = new mongoose.Schema({
    name: String,
    poll: [Poll],
    friend: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    itin: [Itin],
    past: Boolean,
    todo: [Object]
});

mongoose.model('Trip', Trip);

const PastTrip = new mongoose.Schema({
    trip: Trip,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('PastTrip', PastTrip);

const Pref = new mongoose.Schema({
    budget: Number,
    time: String,
    length: Number,
    type: String,
    rating: Number,
    transport: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Pref', Pref);

const Post = new mongoose.Schema({
    title: String,
    post: String,
    createdDate : { type : Date, default: Date.now },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Post', Post);

mongoose.connect(url)
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });


const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://yushin420:Dbtlsld9317@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;
const client = new MongoClient(url);

client.connect();
/*
const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    picture: String
});
*/
//mongoose.model('User', User);

const Poll = new mongoose.Schema({
    name: String,
    date: String,
    message: String,
    opa: String,
    opb: String,
    opc: String
});

mongoose.model('Poll', Poll);

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

const Itin = new mongoose.Schema({
    type: String,
    name: String,
    location: String,
    time: String
});

mongoose.model('Itin', Itin);

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


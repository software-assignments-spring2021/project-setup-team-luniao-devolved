const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://yushin420:Dbtlsld9317@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;
const client = new MongoClient(url);

client.connect();

const Trip = new mongoose.Schema({
    name: String,
    poll: [{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}],
    friend: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    itin: {type: mongoose.Schema.Types.ObjectId, ref: 'Itin'},
    todo: String
});

mongoose.model('Trip', Trip);

const PastTrip = new mongoose.Schema({
    trip: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trip'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('PastTrip', PastTrip);

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

const connectDb = () => {
    if (process.env.NODE_ENV === 'PRODUCTION') {
        return mongoose.connect(process.env.PROD_DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true});
    }
    return mongoose.connect(process.env.DEV_DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true});
};

const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;

const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    picture: String
});

mongoose.model('User', User);

mongoose.connect(url)
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
});


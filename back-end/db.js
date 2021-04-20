const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;


/**** User ****/
const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

mongoose.model('User', User);


/**** Post ****/
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
    // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //comment out once passport is set up
});

mongoose.model('Post', postSchema);



mongoose.connect(url)
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
});


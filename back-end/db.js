const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;

const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

mongoose.model('User', User);



/**** Past Trips ****/


//Todo -- add more/relevant items as is in the itenerary schema
const pastTripsSchema = new mongoose.Schema({
    location:  String, 
    friends:   [{id: mongoose.Schema.Types.ObjectId}], // {object id in friends database}
    startDate: { type: Date},
    endDate: { type: Date},
    todoList: [{text:"string"}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

mongoose.model('PastTrips', pastTripsSchema);






mongoose.connect(url)
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
});


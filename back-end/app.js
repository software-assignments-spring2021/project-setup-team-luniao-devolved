// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require("cors");
//const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const PORT = process.env.PORT || 4000;
const pollRoute = express.Router();//router for createpoll
const prefRoute = express.Router();//router for preferences
const itinRoute = express.Router();//router for itinerary
const mongoose = require('mongoose');//for future use

// let Poll = require('./poll.model.js');
// let Pref = require('./preference.model.js')

app.use(cors());
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(morgan('tiny'));//for logging incoming requests
//app.use('/Cpoll, pollRoute');

//POST route for createpoll
pollRoute.route('/').post(function (req, res) {
    //console.log(p);
    res.status(200).json({ 'p': 'added' });
    console.log(req.body);//printing JSON data
    //res.send("heY!")
    // poll.save()
    //     .then(poll => {
    //         res.status(200).json({'poll': 'poll created'});
    //     })
    // .catch(err => {
    //     res.status(400).send('failed to create poll')
    // })
})
//POST route for preferences
prefRoute.route('/').post(function (req, res) {
    res.status(200).json({ 'p': 'added' });
    console.log(req.body);//printing JSON data
})

//GET route for itinerary
itinRoute.route('/').get(function (req, res) {
    axios//currently obtaining items from Mockaroo in place of database
        .get("https://my.api.mockaroo.com/itinerary_items.json?key=f3836780")
        .then(itin => {

            res.json(itin.data);
            console.log('Retrieved itinerary items');
        })
})
//POST route for itinerary
itinRoute.route('/').post(function (req, res) {
    res.status(200).json({ 'p': 'added' });
    console.log(req.body);//printing JSON data
})
//Router configuration
app.use('/createpoll', pollRoute);
app.use('/preferences', prefRoute);
app.use('/itinerary', itinRoute);
app.listen(PORT, () => {
    console.log('server start on port 4000');
});
// export the express app we created to make it available to other modules
module.exports = app
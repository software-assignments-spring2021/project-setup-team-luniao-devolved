// import and instantiate express
const express = require("express") // CommonJS import style!
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const axios = require("axios")
const cors = require('cors');
const mongoose = require('mongoose');
//const bodyParser = require("body-parser");

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

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());

// not making routes for Guest Dashboard because doesn't require any data from back end

/* Login Page Router */
app.post("/api/login", (req, res) => {
    // currently, we're not using mongoose so cannot check whether the user is in the database
    // printing out the inputted user to prove back-end is working as of now

    const user = {
        email: req.body.email,
        password: req.body.password
    };

    console.log(user);
    res.json(user);
});

/* Sign Up Page Router */
app.post("/api/signup", (req, res) => {
    // currently, we're not saving new users to the database
    // prints out the inputted new user to prove back-end is working as of now

    const user = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    };

    console.log(user);
    res.json(user);
})

/* Recommendations Page Routes */
app.post("/api/recommendations", (req, res) => {
    
    // now we have the data
    recForm = req.body;

    // if flight data
    if (recForm['topic']==0) {
        // if flight, we use skyscanner api to get flight information
        // will add functionality to choose airports later and budget

        var options = {
            method: 'GET',
            url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/JFK-sky/LHR-sky/' + recForm['date'],
            headers: {
            'x-rapidapi-key': '48b6700027mshf2353e12af2853bp1e9d9fjsn189a7bf51c0b',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
            }
        };
                
        axios.request(options).then(function (response) {
            let results = [];

            resultsJSON = response.data;

            for (const item in resultsJSON['Quotes']) {
                let newResult = new Object();
                newResult.date = resultsJSON['Quotes'][item]["OutboundLeg"].DepartureDate.slice(0,10);
                newResult.from_country = resultsJSON['Places'][0].IataCode;
                newResult.to_country = resultsJSON['Places'][1].IataCode;
                newResult.cost = resultsJSON['Quotes'][item].MinPrice;
                newResult.url = "http://example.org";

                results.push(newResult);
              }

            console.log(results);
            res.json(results);
        }).catch(function (error) {
            console.error(error);
        });
    }
  })


app.use(morgan('tiny'));//for logging incoming requests
//app.use('/Cpoll, pollRoute');

/* Create Post Page Routes */
app.post("/api/createpost", (req, res) => {
    
    // now we have the data
    recForm = req.body;

    // now, we would use mongoose to save the post data in a database. But to prove the back-end
    // is working, I output the post data to the console of the server.
    console.log(recForm);
    res.end();
    
});

/* Preferences Page Routes */
const pollRoute = express.Router();
const prefRoute = express.Router();

// let Poll = require('./poll.model.js');
// let Pref = require('./preference.model.js')
//app.use('/Cpoll, pollRoute');

pollRoute.route('/').post(function (req, res) {
    //console.log(p);
    res.status(200).json({ 'p': 'added' });
    console.log(req.body);
    //res.send("heY!")
    // poll.save()
    //     .then(poll => {
    //         res.status(200).json({'poll': 'poll created'});
    //     })
    // .catch(err => {
    //     res.status(400).send('failed to create poll')
    // })
})

prefRoute.route('/').post(function (req, res) {
    res.status(200).json({ 'p': 'added' });
    console.log(req.body);
})
app.use('/createpoll', pollRoute);
app.use('/preferences', prefRoute);

//View Profile routes
app.get("/api/ProfilePage", (req, res) => {
    //Without a database this is just linking to mockaroo
    axios
    .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
    .then(user => {
        //Map the response onto the User data
        res.json(user.data);
        console.log('Retrieved User data');
        })
    .catch(err => next(err)) 

})

app.get('/api/currentTrip', (req,res) => {
    // same as for the mockaroo data for friends...
    // used another mockaroo link for now, im not sure how to create sample data if anyone could help with that!
    axios
    .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
    .then(currentTrip => {

        res.json(currentTrip.data);
        console.log('Retrieved current trip!');
        }) 
    .catch(err => next(err)) 


app.post('/api/newTrip', (req,res, next) => {

    response = {
        // to do once we set up db ? 
    }
    console.log('New Trip Created!')
    .catch(err => next(err))


app.get('/api/friends', (req,res) => {
    // used another mockaroo link for now, im not sure how to create sample data if anyone could help with that!
    axios
    .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
    .then(friends => {
        
        res.json(friends.data);
        console.log('Retrieved friends list');
        }) 
    .catch(err => next(err)) 
});

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
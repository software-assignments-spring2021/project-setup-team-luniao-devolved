// import and instantiate express
const express = require("express") // CommonJS import style!
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const axios = require("axios")
const cors = require('cors');
const mongoose = require('mongoose');
const connection = mongoose.connection;
// database set up
require('./db');
const User = mongoose.model('User');
const Pollschema = mongoose.model('Pollschema');
const Pref = mongoose.model('Pref');
const Itin = mongoose.model('Itin');
const dotenv = require("dotenv");
dotenv.config();
const app = express() // instantiate an Express object
//const bodyParser = require("body-parser");
app.use(morgan('tiny'));
const PORT = process.env.PORT || 5000;
const itinRoute = express.Router();//router for itinerary

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

    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            console.log("logged in!");
        }
        else {
            console.log("You must sign up!");
        }
    })

    /*
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    console.log(user);
    res.json(user);
    */
});

/* Sign Up Page Router */
app.post("/api/signup", (req, res) => {
    // currently, we're not saving new users to the database
    // prints out the inputted new user to prove back-end is working as of now

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.send("alreadyuser");
        }
        else {
            if (req.body.password !== req.body.repassword) {
                res.send("incorrectpw");
            }

            else {
                new User({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: req.body.password
                }).save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('saved!');
                        res.send("success");
                    }
                });
            }
        }
    });
});

/* Past Trips Page Routes */
// An api endpoint that returns list of past trips
app.get('/api/pasttrips', (req, res) => {

    /*
    Once mongoose is setup, we would retrieve the data of past trips stored by unique user id. However, as we don't
    mongo set up, I just retrieve mock data from mockaroo.
    */
    axios
        .get("https://my.api.mockaroo.com/past-trips.json?key=8f9d78c0")
        .then(pastTrips => {

            res.json(pastTrips.data);
            console.log('Retrieved past trips');
        }) // pass data along directly to client
        .catch(err => next(err)) // pass any errors to express
});

/* Recommendations Page Routes */
app.post("/api/recommendations", (req, res) => {

    // now we have the data
    recForm = req.body;

    // if flight data
    if (recForm['topic'] == 0) {
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
                newResult.date = resultsJSON['Quotes'][item]["OutboundLeg"].DepartureDate.slice(0, 10);
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
});


//for logging incoming requests
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

    const npoll = new Pollschema({
        name: req.body.name,
        date: req.body.date,
        message: req.body.message,
        opa: req.body.opa,
        opb: req.body.opb,
        opc: req.body.opc
    }).save()
        .then(npoll => {
            res.status(200).json({ 'poll': 'saved successfully' });
        })
        .catch(err => {
            res.status(400).send('failed to create poll');
        })
    //console.log(req.body);
    //res.send("heY!")
    // poll.save()
    //     .then(poll => {
    //         res.status(200).json({'poll': 'poll created'});
    //     })
    // .catch(err => {
    //     res.status(400).send('failed to create poll')
    // })
});

//prefRoute.route('/').post(function (req, res) {
app.post("/api/preferences", (req, res) => {
    const npref = new Pref({
        budget: req.body.budget,
        time: req.body.time,
        length: req.body.length,
        type: req.body.type,
        rating: req.body.rating,
        transport: req.body.transport
    }).save(function(err) {
        if (err) {
            res.status(400).send('failed to save preferences');
        }
        else {
            res.status(200).json({ 'preferences': 'saved successfully' });
        }
    });
        /*.then(npref => {
            console.log(npref);
            res.status(200).json({ 'preferences': 'saved successfully' });
        })
        .catch(err => {
            res.status(400).send('failed to save preferences');
        })*/
});

//Dashboard Routes
//Here we send a get request to display the recent posts from the users' friends
app.get("/api/Dashboard", (req, res) => {
    axios
        .get("https://my.api.mockaroo.com/users.json?key=4e1c2150") //Getting some mock data for the posts until the DB is set up
        .then(post => {

            res.json(post.data);
            console.log('Posts received')
        })
        .catch(err => next(err))
});

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

});

app.get('/api/currentTrip', (req, res) => {
    // same as for the mockaroo data for friends...
    // used another mockaroo link for now, im not sure how to create sample data if anyone could help with that!
    axios
        .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
        .then(currentTrip => {
            res.json(currentTrip.data);
            console.log('Retrieved current trip!');
        })
        .catch(err => next(err))
});


app.post('/api/newTrip', (req, res, next) => {
    //Without a database this is just linking to mockaroo
    axios
        .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
        .then(user => {
            //Map the response onto the User data
            res.json(user.data);
            console.log('New trip');
        })
        .catch(err => next(err))
});


app.get('/api/friends', (req, res) => {
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
    // axios//currently obtaining items from Mockaroo in place of database
    //     .get("https://my.api.mockaroo.com/itinerary_items.json?key=f3836780")
    //     .then(itin => {
    //         res.json(itin.data);
    //         console.log('Retrieved itinerary items');
    //     })
    Itin.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

//POST route for itinerary
itinRoute.route('/').post(function (req, res) {
    const npoll = new Pollschema({
        type: req.body.type,
        name: req.body.name,
        location: req.body.location,
        time: req.body.time


    }).save()
        .then(npoll => {
            res.status(200).json({ 'Itinerary item': 'saved successfully' });
        })
        .catch(err => {
            res.status(400).send('failed to create item');
        })
});

//Router configuration
app.use('/createpoll', pollRoute);
app.use('/preferences', prefRoute);
app.use('/itinerary', itinRoute);

// Edit Profile Routes 
//This will send a get request for the EditProfile page and lay the groundwork for updating the user's data
app.post('/api/EditProfile', (req, res, next) => {

    response = {
        /*
        Without a database setup it is hard to actually change the User's data,
        but this will happen here in a fashion similar to this 
        email:req.body.newEmail,
        password:req.body.newPW
        */
    }
    console.log('User profile updated')
        .catch(err => next(err))

});


/*
//Upload picture route
//configure storage
const storage = multer.diskStorage({
    //Give the file somewhere to go ('uploads' directory)
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    //Give the new file a name--ID randomly generated by uuidv4()
    filename: (req, file, cb) => {
        const newFilename = '${uuidv4()}${path.extname(file.originalname)}';
        cb(null, newFilename);
    }, 
});

//create multer instance used to upload the file
const upload = multer({storage})

//Process the uploaded file to the server
app.post('/EditProfile', upload.single('selectedFile'), (req, res) =>{
    res.send();
})


});*/

app.listen(PORT, () => {
    console.log('server start on port 4000');
});
// export the express app we created to make it available to other modules
module.exports = app;
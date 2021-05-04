// import and instantiate express
const express = require("express") // CommonJS import style!
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const axios = require("axios")
const cors = require('cors');
const jwtSecret = require('./config/jwtConfig');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const connection = mongoose.connection;



// database set up
require('./db');
//const User = mongoose.model('User');
const Poll = mongoose.model('Poll');
const Pref = mongoose.model('Pref');
const Itin = mongoose.model('Itin');
const Post = mongoose.model('Post');
const Trip = mongoose.model('Trip');


const bodyParser = require('body-parser');
const passport = require('passport')

//passport set up
require('./config/passport')

// database set up
require('./db');
const dotenv = require("dotenv");
dotenv.config();

//require all db models
var User = require('./models/user');

const app = express() // instantiate an Express object
//const bodyParser = require("body-parser");
app.use(morgan('tiny'));
const PORT = process.env.PORT || 5000;
const itinRoute = express.Router();//router for itinerary

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());
app.use(passport.initialize());

// not making routes for Guest Dashboard because doesn't require any data from back end

//Importing passport routes
require('./routes/loginUser')(app);
require('./routes/registerUser')(app);

//delete user database docs -- for testing purposes
// User.deleteMany({}, function (err, posts) {} );
User.find({}, function (err, posts) { 
    if (err) return console.error(err);
    console.log(posts);
});

/* Get User info */
app.get('/api/userinfo', (req, res) => {
    // now we have the data
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser}, function (err, user) {
        res.json(user);
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
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    //get user mongoose object id
    User.findOne({ email: decodedUser}, function (err, user) {
        //validation for the post

        //save in the database
        new Post({
            title: recForm.title,
            post: recForm.post,
            author: user._id
        }).save(function(err,result){
            if (err){
                console.log(err);
            }
            else{
                console.log(result)
            }
        })

        console.log(recForm);
        console.log(decodedUser);
        console.log(user._id);
    });
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

    const npoll = new Poll({
        name: req.body.name,
        date: req.body.date,
        message: req.body.message,
        opa: req.body.opa,
        opb: req.body.opb,
        opc: req.body.opc
    }).save(function(err) {
        if (err) {
            res.status(400).send('failed to create poll');
        }
        else {
            res.status(200).json({ 'poll': 'saved successfully' });
        }
    });
        /*.then(npoll => {
            res.status(200).json({ 'poll': 'saved successfully' });
        })
        .catch(err => {
            res.status(400).send('failed to create poll');
        })*/
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

/* Preferences Page */
app.get('/api/preferences', (req, res) => {
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser }, function (err, user) {
        console.log(user);
        Pref.findOne({user: user._id}, function(err, pref) {
            console.log(pref);
            res.json(pref);
        });
    });
});

app.post("/api/preferences", (req, res) => {
    const userHash = req.header('Authorization').slice(4);
    const decodedUser = jwt.verify(userHash, jwtSecret.secret).id;
    
    User.findOne({email: decodedUser}, function(err, user) {
        
        const pref = {
            budget: req.body.budget,
            time: req.body.time,
            length: req.body.length,
            type: req.body.type,
            rating: req.body.rating,
            transport: req.body.transport,
            user: user._id
        }

        Pref.findOne({user: user._id}, function(err, curr) {

            console.log(curr);

            // create new preference
            if (curr === null) {
                new Pref(pref).save(function(err, result) {
                    if (err) console.log(err);
                    else {
                        console.log("saved!", result);
                        // link to User Schema
                        Pref.findOne({user: user._id}, function(err, pref) {
                            User.findByIdAndUpdate(user._id, {preference: pref._id}, function(err, result) {
                                if (err) console.log(err);
                                else console.log("success!");
                            });
                        });
                    }
                });
            }
            // update if preference already exists
            else {
                const userId = {user: user._id};
                Pref.update(userId, {$set: pref}, function(err, updated) {
                    if (err) console.log(err);
                    else {
                        // link to User Schema
                        Pref.findOne({user: user._id}, function(err, pref) {
                            User.findByIdAndUpdate(user._id, {preference: pref._id}, function(err, result) {
                                if (err) console.log(err);
                                else console.log("success!");
                            });
                        });
                    }
                });
            }
        });
    });
    res.end();
});

//Dashboard Routes
//Here we send a get request to display the recent posts from the users' friends
app.get("/api/Dashboard", (req, res) => {
    // console.log(req.user);
    // axios
    //     .get("https://my.api.mockaroo.com/users.json?key=4e1c2150") //Getting some mock data for the posts until the DB is set up
    //     .then(post => {

    //         res.json(post.data);
    //         console.log('Posts received')
    //     })
    //     .catch(err => next(err))

    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser}, function (err, user) {

        if (err) {
            console.log(err);
        }

        let newDocs = Post.find({'author': { $in: user.friends}}, function(err, docs){
            if (err) {
                console.log(err);
            }

            console.log(docs);

            return res.json(docs);
        }).populate('author');


    });

});


//getuserbyid
app.post("/api/getuser", (req, res) => {
    // console.log(req.user);
    // axios
    //     .get("https://my.api.mockaroo.com/users.json?key=4e1c2150") //Getting some mock data for the posts until the DB is set up
    //     .then(post => {

    //         res.json(post.data);
    //         console.log('Posts received')
    //     })
    //     .catch(err => next(err))

    User.findById(req.body.id, function (err, user) {

        if (err) {
            console.log(err);
        }

        return res.json(user);
    });

});



//View Profile routes
app.get("/api/ProfilePage", (req, res) => {
    //Without a database this is just linking to mockaroo
    // axios
    //     .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
    //     .then(user => {
    //         //Map the response onto the User data
    //         res.json(user.data);
    //         console.log('Retrieved User data');
    //     })
    //     .catch(err => next(err))

    //Getting posts from the database

    // now we have the data
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    //get user mongoose object id
    User.findOne({ email: decodedUser}, function (err, user) {
        if(err) {console.log(err);}

        //validation for the post
        Post.find({ author: user._id}, function(err, posts) {
            if(err) {console.log(err);}
            res.json(posts);
        });
        
    });
});

/* Current Trip Page */
app.get('/api/currenttrip', (req, res) => {
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser }, function (err, user) {
        console.log(user);
        Trip.findOne({user: user._id}, function(err, pref) {
            console.log(pref);
            res.json(pref);
        });
    });
});

app.post("/api/currenttrip", (req, res) => {
    const userHash = req.header('Authorization').slice(4);
    const decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({email: decodedUser}, function(err, user) {

        const newtrip = {
            name: req.body.name,
            todo: req.body.todo,
            user: user._id
        }

        Trip.findOne({user: user._id} , function(err, trip) {
            const userId = {user: user._id};

            console.log("TRIP", trip)

            Trip.update(userId, {$set: newtrip}, function(err, updated) {
                if (err) console.log(err);
                else {
                    // link to User Schema
                    console.log(updated);
                    Trip.findOne({user: user._id}, function(err, trip) {
                        User.findByIdAndUpdate(user._id, {trip: trip._id}, function(err, result) {
                            if (err) console.log(err);
                            else console.log("success!");
                        });
                    });
                }
            });
        });
    });
});

/* New Trip Page */
app.post('/api/newtrip', (req, res) => {
    const userHash = req.header('Authorization').slice(4);
    const decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({email: decodedUser}, function(err, user) {

        const newtrip = {
            name: req.body.name,
            todo: req.body.todo,
            user: user._id
        }

        Trip.findOne({user: user._id}, function(err, trip) {
            // if new trip doesn't exist
            if (trip === null) {
                new Trip(newtrip).save(function(err, result) {
                    if (err) console.log(err);
                    else {
                        console.log("New trip saved!");
                    }
                });
            }
            // if new trip is already created
            else {
                console.log("You need to save your trip before creating a new one!")
                res.send("alreadyexists");
            }
        });
    });
});


app.get('/api/friends', (req, res) => {
    // used another mockaroo link for now, im not sure how to create sample data if anyone could help with that!
    // axios
    //     .get("https://my.api.mockaroo.com/users.json?key=4e1c2150")
    //     .then(friends => {
    //         res.json(friends.data);
    //         console.log('Retrieved friends list');
    //     })
    //     .catch(err => next(err))

    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser}, function (err, user) {

        if (err) {
            console.log(err);
        }

        User.find({'_id': { $in: user.friends}
        }, function(err, docs){
            if (err) {
                console.log(err);
            }
            return res.json(docs);
        });
    });
});


app.post('/api/delfriend', (req, res, next) => {

    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    console.log(req.body);

    //get user mongoose object id
    User.findOne({ email: decodedUser}, function (err, user) {

        //find another user with that email
        User.findOne({ email: req.body.email}, function (err, friend) {

            if (err) {
                return res.send("nofriend");
            }

            if (!user.friends.includes(friend._id)) {
                return res.send("alreadyexists");
            } else {
                user.friends = user.friends.remove(friend._id);
                user.save(function(err, result) {
                    if (err){
                        console.log(err);
                    }
                });
                return res.status(200).send("success");
            }
        });
        
    });
});

app.post('/api/addfriend', (req, res, next) => {

    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    //get user mongoose object id
    User.findOne({ email: decodedUser}, function (err, user) {
        //find another user with that email
        User.findOne({ email: req.body.email}, function (err, friend) {

            if (err || !friend) {
                return res.send("nofriend");
            }

            if (user.friends.includes(friend._id)) {
                return res.send("alreadyexists");
            }

            console.log(friend._id);
            console.log(user._id);
            if (friend._id.equals(user._id)) {
                return res.send("youarefriend");
            }

            user.friends.push(friend._id);
            user.save(function(err, result) {
                if (err){
                    console.log(err);
                }
            });
            return res.status(200).send("success");
        });
        
    });
});

app.get('/logout', (req, res) => {
    req.logout();
});


//GET route for itinerary
itinRoute.route('/').get(function (req, res) {
    // axios//currently obtaining items from Mockaroo in place of database
    //     .get("https://my.api.mockaroo.com/itinerary_items.json?key=f3836780")
    //     .then(itin => {
    //         res.json(itin.data);
    //         console.log('Retrieved itinerary items');
    //     })
    Itin.find({}, function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

//POST route for itinerary
itinRoute.route('/').post(function (req, res) {
    const itin = new Itin({
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
        });
});

//Router configuration
app.use('/createpoll', pollRoute);
app.use('/preferences', prefRoute);
app.use('/itinerary', itinRoute);

// Edit Profile Routes 
//This will send a get request for the EditProfile page and lay the groundwork for updating the user's data
app.post('/api/EditProfile', (req, res, next) => {

    res = {
        
        /*
        Without a database setup it is hard to actually change the User's data,
        but this will happen here in a fashion similar to this
        await db.collection('User').updateOne{ 
            {
                $set: {'email': req.body.newEmail},
                $set: {'password' :req.body.newPW}
            }
        }
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
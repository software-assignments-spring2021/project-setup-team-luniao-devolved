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
const PastTrip = mongoose.model('PastTrip');


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

Trip.find({}, function (err, posts) { 
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
app.get('/api/pasttrips', (req, res) => {
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser }, function (err, user) {
        console.log(user);
        PastTrip.find({user: user._id}, function(err, trip) {
            console.log(trip);
            res.json(trip);
        });
    });
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

/* Create Poll Page */
app.get('/api/createpoll', function(req, res) {
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser }, function (err, user) {
        Trip.findOne({user: user._id, past: false}, function(err, trip) {
            console.log(trip)
            if (trip !== null) {
                res.json(trip.poll);
            }
            else {
                Trip.findOne({friend: user._id, past: false}, function(err, friendtrip) {
                    if (friendtrip !== null) {
                        res.json(friendtrip.poll);
                    }
                });
            }
        });
    });
});

app.post('/api/createpoll', function (req, res) {
    const userHash = req.header('Authorization').slice(4);
    const decodedUser = jwt.verify(userHash, jwtSecret.secret).id;
    
    User.findOne({email: decodedUser}, function(err, user) {
        Trip.findOne({user: user._id, past: false}, function(err, currtrip) {
            if (err) console.log(err);
            else {
                const poll = {
                    name: req.body.name,
                    date: req.body.date,
                    message: req.body.message,
                    data: req.body.data,
                    trip: currtrip._id
                }

                new Poll(poll).save(function(err, result) {
                    if (err) console.log(err);
                    else {
                        Trip.update({user: user._id, past: false}, {$push: {poll: result}}, function(err, poll) {
                            if (err) console.log(err);
                            else {
                                console.log("poll saved to trip!");
                            }
                        })
                    }
                })
            }
        });
    });
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

        Trip.findOne({user: user._id, past: false}, function(err, trip1) {

            if (!trip1) { 
                Trip.findOne({'friend': user._id, past: false}, function(err, trip2) {

                    if (trip2) {
                        user.trip = trip2._id;
                        user.save(function(err, result) {
                            if (err){
                                console.log(err);
                            }
                        });
                    }
                    
                    res.json(trip2);
                });
            }
            else {
                res.json(trip1);
            }
        });
    });
});

app.post("/api/currenttrip", (req, res) => {
    const userHash = req.header('Authorization').slice(4);
    const decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({email: decodedUser}, function(err, user) {

        Trip.findOne({user: user._id, past: false} , function(err, trip) {
            let userId = {};
            let newtrip = {}
            console.log(req.body.name);
            if (req.body.name !== undefined) {
                newtrip = {
                    name: req.body.name,
                    todo: req.body.todo
                }
            }

            else {
                newtrip = {
                    todo: req.body.todo
                }
            }
            if (trip !== null) {
                userId = {user: user._id, past: false};
            }

            else {
                userId = {friend: user._id, past: false}
            }

            Trip.update(userId, {$set: newtrip}, function(err, updated) {
                if (err) console.log(err);
                else {
                    // link to User Schema
                    console.log(updated);
                    Trip.findOne({user: user._id, past: false}, function(err, trip) {

                        if (trip) {
                            User.findByIdAndUpdate(user._id, {trip: trip._id}, function(err, result) {
                                if (err) console.log(err);
                                else {
                                    console.log("success!");
                                    if (req.body.past) {
                                        const pasttrip = {
                                            trip: trip,
                                            user: user._id
                                        }

                                        new PastTrip(pasttrip).save(function(err, result) {
                                            if (err) console.log(err);
                                            else {
                                                console.log("saved to past trip!");
                                                Trip.update({user: user._id, past: false}, {$set: {past: true}}, function(err, trip) {
                                                    if (err) console.log(err);
                                                    else {
                                                        console.log("current trip archived!");
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            trip = user.trip;

                            User.findByIdAndUpdate(user._id, {trip: trip._id}, function(err, result) {
                                if (err) console.log(err);
                                else {
                                    console.log("success!");
                                    if (req.body.past) {
                                        const pasttrip = {
                                            trip: trip,
                                            user: user._id
                                        }

                                        new PastTrip(pasttrip).save(function(err, result) {
                                            if (err) console.log(err);
                                            else {
                                                console.log("saved to past trip!");
                                                Trip.update({user: user._id, past: false}, {$set: {past: true}}, function(err, trip) {
                                                    if (err) console.log(err);
                                                    else {
                                                        console.log("current trip archived!");
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            });

                        }
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
            user: user._id,
            friend: [user._id],
            past: false
        }

        Trip.findOne({user: user._id, past: false}, function(err, trip) {
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

app.get('/api/viewfriendscurrenttrip', (req, res) => {
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
    User.findOne({ email: decodedUser }, function (err, user) {
        Trip.findOne({user: user._id, past: false}, function(err, trip) {
            if (err) {
                console.log(err);
            }
            if (trip) {
                return res.json(trip.friend)}
            else {
                Trip.findOne({friend: user._id, past: false}, function(err, newtrip) {
                    if (newtrip) {
                        Trip.findOne({user: newtrip.user, past: false}, function(err, owner) {
                            return res.json(owner.friend);
                        }).populate("friend");
                    }
                });
            }     
        }).populate("friend");
    });
});

app.post('/api/adduserscurrenttrip', (req, res, next) => {
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser }, function (err, user) {
        Trip.findOne({user: user._id, past: false}, function(err, trip) {

            console.log("recForm", recForm)

            let allEmails = recForm.map(a => a.value);
            console.log(allEmails);


            //find another user with that email
            User.find({'email': { $in: allEmails}}, function (err, friend) {

                if (err || !friend) {
                    return res.send("nofriend");
                }

                let allIDs = friend.map(a => a._id);

                console.log(trip);

                if (trip.friend) {
                    if (trip.friend.some(r=> allIDs.indexOf(r) >= 0)) {
                        return res.send("alreadyexists");
                    }
                }

                trip.friend = trip.friend.concat(allIDs);
                trip.save(function(err, result) {
                    if (err){
                        console.log(err);
                    }
                });
                return res.status(200).send("success");

            });
        });
    });


})

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


/* Itinerary Page */
app.get('/api/itinerary', function (req, res) {
    recForm = req.body;
    userHash = req.header('Authorization').slice(4);
    decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({ email: decodedUser }, function (err, user) {
        Trip.findOne({user: user._id, past: false}, function(err, trip) {
            Itin.find({user: user._id, trip: trip._id}, function(err, itin) {
                console.log('itinerary sent!');
                res.json(itin);
            });
        })
    });
});

app.post('/api/itinerary', function (req, res) {
    const userHash = req.header('Authorization').slice(4);
    const decodedUser = jwt.verify(userHash, jwtSecret.secret).id;

    User.findOne({email: decodedUser}, function(err, user) {
        Trip.findOne({user: user._id, past: false}, function(err, currtrip) {
            if (err) console.log(err);
            else {
                const itin = {
                    type: req.body.type,
                    name: req.body.name,
                    location: req.body.location,
                    time: req.body.time,
                    user: user._id,
                    trip: currtrip._id
                }

                new Itin(itin).save(function(err, result) {
                    if (err) console.log(err);
                    else {
                        Trip.update({user: user._id, past: false}, {$push: {itin: result}}, function(err, updated) {
                            if (err) console.log(err);
                            else {
                                console.log("itinerary added to trip!");
                                res.send("itinerary");
                            }
                        })
                    }
                });
            }
        });
    });
});

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
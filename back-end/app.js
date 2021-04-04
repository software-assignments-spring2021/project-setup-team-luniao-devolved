// import and instantiate express
const express = require("express") // CommonJS import style!
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const axios = require("axios")
const cors = require('cors');

const app = express() // instantiate an Express object

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

// we will put some server logic here later...


/* Past Trips Page Routes */
// An api endpoint that returns list of past trips
app.get('/api/pasttrips', (req,res) => {

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



// export the express app we created to make it available to other modules
module.exports = app
// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require("cors");
//const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;
const pollRoute = express.Router();
const prefRoute = express.Router();
const mongoose = require('mongoose');

let Poll = require('./poll.model.js');
let Pref = require('./preference.model.js')

app.use(cors());
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(morgan('tiny'));
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
app.listen(PORT, () => {
    console.log('server start on port 4000');
});
// export the express app we created to make it available to other modules
module.exports = app
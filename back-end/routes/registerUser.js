// const User = require('../db.js');
var User = require('../models/user');
const passport = require('passport');

module.exports = app => {
  app.post('/api/signup', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) { console.log(err); }
      if (info != undefined) {
        res.send(info.message);
      } else {
        req.login(user, err => {
          User.findOne({email: user.email}, function (err, user) {
            user.save(function(err, result){
                if (err){
                    console.log(err);
                }
                else{
                    user.fullname = req.body.fullname;
                }
            });
            console.log('user created in database');
            res.status(200).send("success");
          });
        });
      }
    })(req, res, next);
  });
};
var User = require('../models/user');
const {jwtSecret} = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');


module.exports = app => {
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.login(user, err => {
            User.findOne({email: user.email}, function(err, user) {
                const token = jwt.sign({ id: user.email }, jwtSecret.secret);
                res.status(200).send({
                    auth: true,
                    token: token,
                    message: 'success',
                });
            });
        });
      }
    })(req, res, next);
  });
};

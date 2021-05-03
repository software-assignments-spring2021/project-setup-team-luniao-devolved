var User = require('../models/user');
const passport = require('passport');



// from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateFullName(name) {
  const re = /^[a-zA-Z-'. ]+$/;
  return re.test(String(name));
}


module.exports = app => {
  app.post('/api/signup', (req, res, next) => {

    //if passwords are not the same
    console.log(req.body.password);
    console.log(req.body.repassword);

    if (req.body.password !== req.body.repassword) {
      res.send("incorrectpw");
      return next(new Error([error]));
    }


    //email has to be a valid email
    if (!validateEmail(req.body.email)) {
      res.send("incorrectem");
      return next(new Error([error]));
    }


    //if fullname is not a name (with each word starting with capital letters)
    if (!validateFullName(req.body.fullname)) {
      res.send("incorrectname");
      return next(new Error([error]));
    }


    passport.authenticate('register', (err, user, info) => {
      if (err) { console.log(err); }
      if (info != undefined) {
        res.send(info.message);
      } else {
        req.login(user, err => {
          User.findOne({email: user.email}, function (err, user) {
            user.fullname = req.body.fullname;
            console.log("************");
            console.log(user);
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
const jwtSecret = require('./jwtConfig')
const bcrypt = require('bcrypt')

const saltRounds = 12;

const passport = require('passport'),
localStrategy = require('passport-local').Strategy,
StrategyJWT = require('passport-jwt').Strategy,
ExtractJWT = require('passport-jwt').ExtractJwt;


var User = require('../models/user');


passport.use( 'register', new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        User.findOne({email: email}, function(err, user) {
            if (user != null) {
                console.log('This email has already been registered.');
                return done(null, false, { message: "alreadyuser" });
            } else {
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    User.create({ email, password: hashedPassword }).then(user => {
                        console.log('Your account has been registered.');
                        return done(null, user);
                  });
                });
            }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use('login', new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        User.findOne({
          where: {
            email: email,
          },
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'Your email is invalid. Please try again.' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('Your password is incorrect. Please try again.');
                return done(null, false, { message: 'Incorrect password.' });
              }
              console.log('Your account is authenticated.');
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new StrategyJWT(jwtOptions, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('User found.');
          done(null, user);
        } else {
          console.log('User not found.');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
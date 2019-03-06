  const JWTStrategy = require('passport-jwt').Strategy;
  const ExtractJWT = require('passport-jwt').ExtractJwt;
  const mongoose = require('mongoose');
  const User = mongoose.model('users');
  const keys = require('../config/keys');

  const opts = {};
  opts.jwtFormRequest = ExtractJWT.fromAuthHeaderAsBearerToken();

  module.exports = passport => {
      passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload)
      }));
  };
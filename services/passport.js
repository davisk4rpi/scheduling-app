const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // find by email to not overwrite someone using multiple strategies
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });

      if (existingUser) {
        if (existingUser.googleId === profile.id) {
          return done(null, existingUser);
        } else {
          const updatedUser = await existingUser.update({
            googleId: profile.id
          });
          return done(null, updatedUser);
        }
      }

      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });

      if (existingUser) {
        if (existingUser.facebookId === profile.id) {
          return done(null, existingUser);
        } else {
          const updatedUser = await existingUser.update({
            facebookId: profile.id
          });
          return done(null, updatedUser);
        }
      }

      const user = await new User({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);

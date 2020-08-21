const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../models');

module.exports = () => {
  console.log('여기');
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { email: profile._json.email, provider: 'google' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        console.log(profile._json.email,'=============')
        const newUser = await User.create({
          email: profile._json && profile._json.email,
          snsId: profile.id,
          provider: 'google',
          username: profile._json.name,
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
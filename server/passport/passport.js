const passport = require('passport');
const keys = require('../keys.js')
const User = require('../config/MongoDb.js');
const GitHubStrategy = require('passport-github2').Strategy;

//Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. 
//In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: keys.GithubId,
  clientSecret: keys.GithubSecret,
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.displayName }, (err, user) => {
      //check for errors finding user
      if (err) { 
        return done(err); 
      }
      //no user found, so we save new user to db
      if (!user) {
        const newUser = {
          githubId: profile.displayName,
        }
        User.create({githubId: profile.displayName}, (err, user) => {
          if (err) {
            return done(err, user);
          }
        })
      }
      else {
        return done(err, user);
      }
    })
  }
));


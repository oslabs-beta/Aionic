import passport from 'passport';
import keys from '../keys';
import {User} from '../config/MongoDb';
import { Strategy as GitHubStrategy } from 'passport-github2';
import * as types from '../types';

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
  callbackURL: keys.GithubCbUrl
},
  (accessToken: string, refreshToken: string, profile: types.GithubProfile, done: (error: any, user? : any, info?: any) => void) => {
    const githubId:string = profile.username;
    User.findOne({ githubId }, (err: Error | null, user: types.User) => {
      //check for errors finding user
      if (err) { 
        return done(err); 
      }
      //no user found, so we save new user to db
      if (!user) {
        User.create({ githubId }, (err: Error | null, user: types.User) => {
          if (err) {
            return done(err, user);
          }
          else {
            return done(null, user);
          }
        })
      }
      else {
        return done(null, user);
      }
    })
  }
));
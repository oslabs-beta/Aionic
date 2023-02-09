//importing modules
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();

//importing middleware and keys
const argoController = require('./middleware/argoController');
const authController = require('./middleware/authController');
require('./passport/passport.js');
const keys = require('./keys.js');

//json parsing, cors, and cookie parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//setting up cookie session after logging in
app.use(cookieSession({
  name:'session',
  keys: ['key1', 'key2']
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//github will return an access token and passport will do its magic in grabbing the data and storing the user in the database
//check passport.js for more info
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

//sends user to github for authorization and guthub will send back a code for us to grab the github access token
app.get('/auth/github', 
  passport.authenticate('github', { scope: ['user:email'] }));

//logout session that destroy cookie and log user out from github
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.get('/', authController.isLoggedIn, (req, res) => {
  res.json('success');
})

app.get('/test', argoController.setToken, (req, res) => {
  console.log(JSON.parse(res.locals.manifest.manifests[1]))
  res.json(res.locals.manifest);
})

//start the server
app.listen(3000, () => {
  console.log('Listening on 3000')
})